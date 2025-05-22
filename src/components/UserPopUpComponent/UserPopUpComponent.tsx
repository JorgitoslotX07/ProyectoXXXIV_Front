import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../utils/userStore";
import { deleteCookiesLogin } from "../../utils/cookisLogin";
import type { UsuarioCompleto } from "../../interfaces/Usuario";
import { httpGet } from "../../utils/apiService";

// type Usuario = {
//   nombre: string;
//   email: string;
//   avatar: string;
// };

const UserId = "11";

// const usuarioSimulado: UsuarioLogin = {
//   usuario: "Dani Sánchez",
//   email: "dani@correo.com",
//   avatar: "/vite.svg",
// };

export const UserPopUpComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioCompleto | null>(null);

  const setToken = useUserStore((state) => state.setToken);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<UsuarioCompleto>("/usuarios/" + UserId);
      if (data) {
        data.avatar = "/vite.svg";
        setUsuario(data);
        console.log(data);
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
        src={usuario?.avatar || "/avatar-placeholder.png"}
        alt="User avatar"
        className="w-10 h-10 rounded-full cursor-pointer border border-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && usuario && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg p-4 z-50">
          <div className="flex items-center space-x-3">
            {usuario.avatar && (
              <img
                src={usuario.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
            )}

            <div>
              <h2 className="text-lg font-semibold">{usuario.usuario}</h2>
              <p className="text-sm text-gray-500">{usuario.email}</p>
            </div>
          </div>

          <hr className="my-3" />

          <button
            onClick={handleConfiguracion}
            className="block w-full text-left text-sm py-2 hover:bg-gray-100 rounded px-2"
          >
            ⚙️ Configuración
          </button>
          <button
            onClick={handleCerrarSesion}
            className="block w-full text-left text-sm py-2 text-red-500 hover:bg-red-100 rounded px-2"
          >
            🔐 Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};
