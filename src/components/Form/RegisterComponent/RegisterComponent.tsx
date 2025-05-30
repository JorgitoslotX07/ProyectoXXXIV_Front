import { useState } from "react";
import type { UserData } from "../../../interfaces/UserData";
import { setLoginCookiesAndRedirect } from "../../../utils/cookisLogin";
import { useNavigate } from "react-router-dom";
import { valodateForm, verificarUsuario } from "../../../utils/verificaciones";
import { Usuario } from "../../../interfaces/Usuario";
import { httpPost } from "../../../utils/apiService";
import { useUserStore } from "../../../hooks/userStore";
import { mostrarError } from "../../../utils/notiToast";

export const RegisterComponent = () => {
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const [form, setForm] = useState<Usuario>(Usuario());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(form);
    const valiForm = valodateForm(form);
    if (valiForm) {
      await httpPost("/auth/registro", form);

      const token: UserData | null = await verificarUsuario(form);
      console.log(token);

      if (token) {
        setToken(token.token);
        setLoginCookiesAndRedirect(token);
        navigate("/");
      } else {
        console.error("Error al generar el token:");
      }
      // mostrarErrorAlUsuario("No se pudo generar el token. Intenta de nuevo.");
    } else {
      const mosErr = "Error de validación";
      // if (validateName(form.usuario)) {
      // }
      // if (validateMail(form.email)) {
      // }
      // if (validatePassword(form.contrasenya)) {
      // }
      mostrarError(mosErr);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1F2937] p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
    >
      <h2
        className="text-2xl font-bold mb-6 text-center"
        style={{ color: "#C4B5FD" }}
      >
        Registro de Usuario
      </h2>

      <input
        type="text"
        name="usuario"
        placeholder="Nombre"
        value={form.usuario}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded bg-[#374151] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C4B5FD] transition"
        // required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded bg-[#374151] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C4B5FD] transition"
        // required
      />

      <input
        type="password"
        name="contrasenya"
        placeholder="Contraseña"
        value={form.contrasenya}
        onChange={handleChange}
        className="w-full p-3 mb-6 rounded bg-[#374151] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C4B5FD] transition"
        // required
      />

      <button
        type="submit"
        className="w-full py-3 rounded bg-[#A7F3D0] text-gray-900 font-semibold hover:bg-[#9EE6C4] transition"
      >
        Crear Cuenta
      </button>
    </form>
  );
};
