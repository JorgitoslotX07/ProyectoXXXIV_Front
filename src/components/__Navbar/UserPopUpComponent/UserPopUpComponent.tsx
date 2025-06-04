import { useState, useRef, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookiesLogin } from "../../../utils/cookisLogin";
import { UsuarioMe } from "../../../interfaces/Usuario";
import { httpGetTok } from "../../../utils/apiService";
import { useUserStore } from "../../../hooks/userStore";
import { useTranslation } from "react-i18next";
import type { ModoClaroProps } from "../../../interfaces/ModoClaroProps";

export const UserPopUpComponent: FC<ModoClaroProps> = ({ modoClaro }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioMe | null>(null);

  const setToken = useUserStore((state) => state.setToken);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioMe>("/usuarios/me");
      if (data) {
        setUsuario(data);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCerrarSesion = () => {
    deleteCookiesLogin();
    setToken("");
    setIsOpen(false);
    navigate("/");
  };

  const handleConfiguracion = () => {
    setIsOpen(false);
    navigate("/panel");
  };

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={usuario?.fotoUrl || "/avatar-placeholder.png"}
        alt="User avatar"
        className="w-10 h-10 rounded-full cursor-pointer border border-gray-500 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && usuario && (
        <div
          className={`absolute right-0 mt-2 w-72 z-50 rounded-xl shadow-2xl p-4 border transition-all duration-300 ${
            modoClaro
              ? "bg-white text-gray-800 border-gray-300"
              : "bg-[#1F2937] text-white border-gray-700"
          }`}
        >
          <div className="flex items-center space-x-3">
            {usuario.fotoUrl && (
              <img
                src={usuario.fotoUrl}
                alt="avatar"
                className={`w-12 h-12 rounded-full border shadow ${
                  modoClaro ? "border-gray-300" : "border-gray-500"
                }`}
              />
            )}

            <div>
              <h2 className="text-lg font-semibold">{usuario.username}</h2>
              <p className={`text-sm ${modoClaro ? "text-gray-500" : "text-gray-400"}`}>
                {usuario.email}
              </p>
            </div>
          </div>

          <hr className={`my-3 ${modoClaro ? "border-gray-200" : "border-gray-600"}`} />

          <button
            onClick={handleConfiguracion}
            className={`block w-full text-left text-sm py-2 rounded px-2 transition duration-150 ${
              modoClaro
                ? "hover:bg-gray-100 text-gray-800"
                : "hover:bg-[#374151] text-white"
            }`}
          >
            ⚙️ {t("popup.configuracion")}
          </button>
          <button
            onClick={handleCerrarSesion}
            className={`block w-full text-left text-sm py-2 rounded px-2 transition duration-150 ${
              modoClaro
                ? "text-red-500 hover:bg-red-100"
                : "text-red-400 hover:bg-[#F93943] hover:text-white"
            }`}
          >
            🔐 {t("popup.cerrarSesion")}
          </button>
        </div>
      )}
    </div>
  );
};
