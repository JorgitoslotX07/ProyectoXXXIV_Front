import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  setLoginCookiesAndRedirect,
} from "../../../utils/cookisLogin";
import type { UserData } from "../../../interfaces/UserData";
import {
  validateName,
  validatePassword,
  verificarUsuario,
} from "../../../utils/verificaciones";
import type { LoginProps } from "../../../interfaces/LoginProps";
import { Usuario } from "../../../interfaces/Usuario";
import { useUserStore } from "../../../hooks/userStore";
import { mostrarError } from "../../../utils/notiToast";
import { useTranslation } from "react-i18next";

interface Props extends LoginProps {
  modoClaro: boolean;
}

export const LoginComponent = ({ onClose, modoClaro }: Props) => {
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState<Usuario>(Usuario());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateName(form.usuario) && validatePassword(form.contrasenya)) {
      const token: UserData | null = await verificarUsuario(form);
      if (token) {
        try {
          setToken(token.token);
          onClose();
          setLoginCookiesAndRedirect(token);
          navigate("/");
        } catch (error) {
          mostrarError(t("login.errorToken"));
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[5px] bg-opacity-70 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-lg shadow-lg w-full max-w-sm relative transition-all duration-300 ${
          modoClaro ? "bg-white text-gray-800" : "bg-[#1F2937] text-white"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className={`absolute top-3 right-3 text-xl transition ${
            modoClaro ? "text-gray-500 hover:text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          ×
        </button>

        <h2
          className={`text-2xl font-semibold mb-6 text-center ${
            modoClaro ? "text-yellow-500" : "text-[#C4B5FD]"
          }`}
        >
          {t("login.titulo")}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder={t("login.placeholderUsuario")}
            value={form.usuario}
            onChange={handleChange}
            className={`w-full p-3 rounded mb-4 focus:outline-none focus:ring-2 transition ${
              modoClaro
                ? "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-yellow-400"
                : "bg-[#374151] text-white placeholder-gray-400 focus:ring-[#C4B5FD]"
            }`}
            required
          />
          <input
            type="password"
            name="contrasenya"
            placeholder={t("login.placeholderContrasenya")}
            value={form.contrasenya}
            onChange={handleChange}
            className={`w-full p-3 rounded mb-6 focus:outline-none focus:ring-2 transition ${
              modoClaro
                ? "bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-yellow-400"
                : "bg-[#374151] text-white placeholder-gray-400 focus:ring-[#C4B5FD]"
            }`}
            required
          />

          <p
            className={`text-center text-sm mb-6 ${
              modoClaro ? "text-gray-600" : "text-gray-300"
            }`}
          >
            {t("login.noCuenta")}{" "}
            <Link
              to="register"
              className={`font-semibold hover:underline ${
                modoClaro ? "text-yellow-600" : "text-[#C4B5FD]"
              }`}
              onClick={onClose}
            >
              {t("login.linkRegistro")}
            </Link>
          </p>

          <button
            type="submit"
            className={`w-full py-3 rounded font-semibold transition ${
              modoClaro
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                : "bg-[#A7F3D0] text-gray-900 hover:bg-[#9EE6C4]"
            }`}
          >
            {t("login.boton")}
          </button>
        </form>
      </div>
    </div>
  );
};
