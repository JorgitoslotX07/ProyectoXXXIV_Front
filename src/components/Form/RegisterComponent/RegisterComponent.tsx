import { useRef, useState } from "react";
import type { UserData } from "../../../interfaces/UserData";
import { setLoginCookiesAndRedirect } from "../../../utils/cookisLogin";
import { useNavigate } from "react-router-dom";
import {
  validateMail,
  validateName,
  validatePassword,
  verificarUsuario,
} from "../../../utils/verificaciones";
import { Usuario } from "../../../interfaces/Usuario";
import { httpPost } from "../../../utils/apiService";
import { useUserStore } from "../../../hooks/userStore";
import { mostrarError } from "../../../utils/notiToast";
import { useTranslation } from "react-i18next";

interface Props {
  modoClaro: boolean;
}

export const RegisterComponent = ({ modoClaro }: Props) => {
  const { t } = useTranslation();
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const [form, setForm] = useState<Usuario>(Usuario());
  const [mensajeError, setMensajeError] = useState("");

  const [erroresCampos, setErroresCampos] = useState({
    usuario: false,
    email: false,
    contrasenya: false,
  });

  const refNombre = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPass = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErroresCampos((prev) => ({ ...prev, [name]: false }));
    setMensajeError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nombreValido = validateName(form.usuario);
    const emailValido = validateMail(form.email);
    const passValida = validatePassword(form.contrasenya);

    if (!form.usuario && !form.email && !form.contrasenya) {
      const msg = t("registro.todosCampos");
      setMensajeError(msg);
      mostrarError(msg);
      setErroresCampos({ usuario: true, email: true, contrasenya: true });
      refNombre.current?.focus();
      return;
    }

    const nuevosErrores = {
      usuario: !nombreValido,
      email: !emailValido,
      contrasenya: !passValida,
    };

    const camposInvalidos = Object.entries(nuevosErrores)
      .filter(([, value]) => value)
      .map(([key]) => key);

    if (camposInvalidos.length > 0) {
      setErroresCampos(nuevosErrores);
      const mensajes = [];
      if (!nombreValido) mensajes.push(t("registro.nombreValido"));
      if (!emailValido) mensajes.push(t("registro.correoValido"));
      if (!passValida) mensajes.push(t("registro.passValida"));
      const combinado = `${t("registro.introduce")} ${mensajes.join(" y ")}`;
      setMensajeError(combinado);
      mostrarError(combinado);

      if (!nombreValido) refNombre.current?.focus();
      else if (!emailValido) refEmail.current?.focus();
      else if (!passValida) refPass.current?.focus();
      return;
    }

    try {
      await httpPost("/auth/registro", form);
      const token: UserData | null = await verificarUsuario(form);
      if (token) {
        setToken(token.token);
        setLoginCookiesAndRedirect(token);
        navigate("/");
      } else {
        const msg = t("registro.usuarioExiste");
        setErroresCampos({ usuario: true, email: false, contrasenya: false });
        setMensajeError(msg);
        mostrarError(msg);
        refNombre.current?.focus();
      }
    } catch {
      const msg = t("registro.errorGeneral");
      setErroresCampos({ usuario: false, email: false, contrasenya: false });
      setMensajeError(msg);
      mostrarError(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-8 rounded-lg shadow-lg w-full max-w-md mx-auto transition-all duration-300 ${
        modoClaro ? "bg-[#fff7ed] text-[#1f2937]" : "bg-[#1F2937] text-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-4 text-center ${
          modoClaro ? "text-yellow-500" : "text-[#C4B5FD]"
        }`}
      >
        {t("registro.titulo")}
      </h2>

      {mensajeError && (
        <p className="text-red-500 text-sm text-center mb-4">{mensajeError}</p>
      )}

      {/* Nombre */}
      <input
        ref={refNombre}
        type="text"
        name="usuario"
        placeholder={t("registro.placeholderNombre")}
        value={form.usuario}
        onChange={handleChange}
        className={`w-full p-3 mb-4 rounded border focus:outline-none focus:ring-2 transition ${
          modoClaro
            ? "bg-white text-[#1f2937] placeholder-gray-500 focus:ring-yellow-400"
            : "bg-[#374151] text-white placeholder-gray-400 focus:ring-[#C4B5FD]"
        } ${
          erroresCampos.usuario
            ? "border-red-500 focus:ring-red-500"
            : "border-transparent"
        }`}
      />

      {/* Email */}
      <input
        ref={refEmail}
        type="email"
        name="email"
        placeholder={t("registro.placeholderCorreo")}
        value={form.email}
        onChange={handleChange}
        className={`w-full p-3 mb-4 rounded border focus:outline-none focus:ring-2 transition ${
          modoClaro
            ? "bg-white text-[#1f2937] placeholder-gray-500 focus:ring-yellow-400"
            : "bg-[#374151] text-white placeholder-gray-400 focus:ring-[#C4B5FD]"
        } ${
          erroresCampos.email
            ? "border-red-500 focus:ring-red-500"
            : "border-transparent"
        }`}
      />

      {/* Contraseña */}
      <input
        ref={refPass}
        type="password"
        name="contrasenya"
        placeholder={t("registro.placeholderPass")}
        value={form.contrasenya}
        onChange={handleChange}
        className={`w-full p-3 mb-2 rounded border focus:outline-none focus:ring-2 transition ${
          modoClaro
            ? "bg-white text-[#1f2937] placeholder-gray-500 focus:ring-yellow-400"
            : "bg-[#374151] text-white placeholder-gray-400 focus:ring-[#C4B5FD]"
        } ${
          erroresCampos.contrasenya
            ? "border-red-500 focus:ring-red-500"
            : "border-transparent"
        }`}
      />

      {erroresCampos.contrasenya && (
        <p className="text-red-400 text-sm mb-4">
          {t("registro.validacionPass")}
        </p>
      )}

      <button
        type="submit"
        className={`w-full py-3 rounded font-semibold transition ${
          modoClaro
            ? "bg-yellow-300 text-gray-900 hover:bg-yellow-400"
            : "bg-[#A7F3D0] text-gray-900 hover:bg-[#9EE6C4]"
        }`}
      >
        {t("registro.boton")}
      </button>
    </form>
  );
};
