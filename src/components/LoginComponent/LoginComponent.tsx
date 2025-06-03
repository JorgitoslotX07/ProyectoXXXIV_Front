import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCookiesLogin,
  setLoginCookiesAndRedirect,
} from "../../utils/cookisLogin";
import type { UserData } from "../../interfaces/UserData";
import {
  validateName,
  validatePassword,
  verificarUsuario,
} from "../../utils/verificaciones";
import type { LoginProps } from "../../interfaces/LoginProps";
import { Usuario } from "../../interfaces/Usuario";
import { useUserStore } from "../../hooks/userStore";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../context/ThemeContext"; // ✅ modo claro/oscuro

export const LoginComponent: FC<LoginProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { modoClaro } = useThemeContext();
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const [form, setForm] = useState<Usuario>(Usuario());
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(false);
    setMensajeError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setMensajeError("");

    if (!form.usuario || !form.contrasenya) {
      setError(true);
      setMensajeError(t("login.camposObligatorios"));
      return;
    }

    if (validateName(form.usuario) && validatePassword(form.contrasenya)) {
      const token: UserData | null = await verificarUsuario(form);
      if (token) {
        try {
          setToken(token.token);
          onClose();
          setLoginCookiesAndRedirect(token);
          console.log(getCookiesLogin());
          navigate("/");
        } catch (error) {
          console.error("Error al generar el token:", error);
          setError(true);
          setMensajeError(t("login.errorGenerico"));
        }
      } else {
        setError(true);
        setMensajeError(t("login.error"));
      }
    } else {
      setError(true);
      setMensajeError(t("login.datosInvalidos"));
    }
  };

  return (
    <div
      className={`fixed inset-0 backdrop-blur-[5px] bg-opacity-70 flex items-center justify-center z-50 ${
        modoClaro ? "bg-gray-200/60" : "bg-black/60"
      }`}
    >
      <div
        className={`p-6 rounded-lg shadow-lg w-full max-w-sm relative transition-all duration-300 ${
          modoClaro ? "bg-white text-[#333]" : "bg-[#1F2937] text-white"
        }`}
      >
        <button
          onClick={onClose}
          aria-label={t("login.cerrarModal")}
          className={`absolute top-3 right-3 text-xl transition ${
            modoClaro ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          ×
        </button>

        <h2
          className={`text-2xl font-semibold mb-4 text-center ${
            modoClaro ? "text-[#7C3AED]" : "text-[#C4B5FD]"
          }`}
        >
          {t("login.titulo")}
        </h2>

        {mensajeError && (
          <p className="text-red-500 text-sm text-center mb-4">{mensajeError}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder={t("login.placeholderUsuario")}
            value={form.usuario}
            onChange={handleChange}
            className={`w-full p-3 rounded mb-4 focus:outline-none focus:ring-2 transition ${
              modoClaro
                ? `bg-gray-100 text-[#333] placeholder-gray-500 ${
                    error
                      ? "border border-red-500 focus:ring-red-500"
                      : "focus:ring-[#7C3AED]"
                  }`
                : `bg-[#374151] text-white placeholder-gray-400 ${
                    error
                      ? "border border-red-500 focus:ring-red-500"
                      : "focus:ring-[#C4B5FD]"
                  }`
            }`}
          />
          <input
            type="password"
            name="contrasenya"
            placeholder={t("login.placeholderContrasenya")}
            value={form.contrasenya}
            onChange={handleChange}
            className={`w-full p-3 rounded mb-6 focus:outline-none focus:ring-2 transition ${
              modoClaro
                ? `bg-gray-100 text-[#333] placeholder-gray-500 ${
                    error
                      ? "border border-red-500 focus:ring-red-500"
                      : "focus:ring-[#7C3AED]"
                  }`
                : `bg-[#374151] text-white placeholder-gray-400 ${
                    error
                      ? "border border-red-500 focus:ring-red-500"
                      : "focus:ring-[#C4B5FD]"
                  }`
            }`}
          />

          <p
            className={`text-center text-sm mb-6 ${
              modoClaro ? "text-gray-600" : "text-gray-300"
            }`}
          >
            {t("login.noCuenta")}{" "}
            <Link
              to="register"
              className={`hover:underline font-semibold ${
                modoClaro ? "text-[#7C3AED]" : "text-[#C4B5FD]"
              }`}
              onClick={onClose}
            >
              {t("login.registrate")}
            </Link>
          </p>

          <button
            type="submit"
            className={`w-full py-3 rounded font-semibold transition ${
              modoClaro
                ? "bg-[#FDE68A] text-[#333] hover:bg-[#FCD34D]"
                : "bg-[#A7F3D0] text-gray-900 hover:bg-[#9EE6C4]"
            }`}
          >
            {t("login.botonEntrar")}
          </button>
        </form>
      </div>
    </div>
  );
};
