import { useState } from "react";
import type { UserData } from "../../interfaces/UserData";
import { setLoginCookiesAndRedirect } from "../../utils/cookisLogin";
import { useUserStore } from "../../utils/userStore";
import { useNavigate } from "react-router-dom";
import {
  valodateForm,
  verificarUsuario,
  hashPassword,
} from "../../utils/verificaciones";
import { Usuario, UsuarioToken } from "../../interfaces/Usuario";

export const RegisterComponent = () => {
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const [form, setForm] = useState<Usuario>(Usuario());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    if (valodateForm(form) && verificarUsuario(form) == null) {
      // console.log("Registrando:", form);

      // enviar peticion a Back

      try {
        const userToken: UsuarioToken = await UsuarioToken(form);
        console.log("Token generado:", userToken);

        // const miToken: string = generateToken(userToken);

        const pass: string = await hashPassword(form.password);

        const userData: UserData = {
          token: form.email + ":" + pass,
        };

        setToken(form.email + ":" + pass);

        setLoginCookiesAndRedirect(userData);

        navigate("/");
      } catch (error) {
        console.error("Error al generar el token:", error);
        // mostrarErrorAlUsuario("No se pudo generar el token. Intenta de nuevo.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Registrar de Usuario
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo Electronico"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 mb-6 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Crear Cuenta
      </button>
    </form>
  );
};
