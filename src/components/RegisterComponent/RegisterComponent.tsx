import { useState } from "react";
import type { UserData } from "../../interfaces/UserData";
import { setLoginCookiesAndRedirect } from "../../utils/cookisLogin";
import { useUserStore } from "../../utils/userStore";
import { useNavigate } from "react-router-dom";
import { valodateForm, verificarUsuario } from "../../utils/verificaciones";
import { Usuario, UsuarioToken } from "../../interfaces/Usuario";
import { httpPost } from "../../utils/apiService";

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
    if (valodateForm(form) && !(await verificarUsuario(form))) {
      console.log("Registrando:", form);

      await httpPost("/usuarios", form);

      try {
        const userToken: UsuarioToken = await UsuarioToken(form);
        console.log("Token generado:", userToken);

        // const miToken: string = generateToken(userToken);

        const userData: UserData = {
          token: form.email + ":" + form.contrasenya,
        };

        setToken(form.email + ":" + form.contrasenya);

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
        name="usuario"
        placeholder="Nombre"
        value={form.usuario}
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
        name="contrasenya"
        placeholder="Contraseña"
        value={form.contrasenya}
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
