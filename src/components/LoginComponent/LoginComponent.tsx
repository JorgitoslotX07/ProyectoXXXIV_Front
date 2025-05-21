import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLoginCookiesAndRedirect } from "../../utils/cookisLogin";
import type { UserData } from "../../interfaces/UserData";
import { useUserStore } from "../../utils/userStore";
import {
  validateMail,
  validatePassword,
  // verificarUsuario,
  hashPassword,
  verificarUsuario,
} from "../../utils/verficaciones";
import type { LoginProps } from "../../interfaces/LoginProps";
import { Usuario, UsuarioToken } from "../../interfaces/Usuario";
// import { generateToken } from "../../utils/jwtUtils";

export const LoginComponent: FC<LoginProps> = ({ onClose }) => {
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const [form, setForm] = useState<Usuario>(Usuario());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.usuario = "Toni^^";
    if (
      validateMail(form.email) &&
      validatePassword(form.contrasenya) &&
      (await verificarUsuario(form))
    ) {
      // console.log("Login:", form);

      // enviar peticion a Back. Despues se eso se hace la comprobacion de resultado para verificar si es verdadero o no
      // const pass = [peticion]
      //peticion de password del mail. Si devueve null no existe email
      // si exite compara comparePassword(form.password, pass)

      try {
        const userToken: UsuarioToken = await UsuarioToken(form);
        console.log("Token generado:", userToken);

        // const miToken: string = generateToken(userToken);
        const pass: string = await hashPassword(form.contrasenya);

        const userData: UserData = {
          token: form.email + ":" + pass,
        };

        setToken(form.email + ":" + pass);

        onClose();

        setLoginCookiesAndRedirect(userData);

        navigate("/");
      } catch (error) {
        console.error("Error al generar el token:", error);
        // mostrarErrorAlUsuario("No se pudo generar el token. Intenta de nuevo.");
      }
    }
  };

  return (
    // Fondo oscuro semitransparente que no interrumpe la página
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-[5px] flex items-center justify-center z-50">
      {/* Contenido del pop-up flotante */}
      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            name="contrasenya"
            placeholder="Contraseña"
            value={form.contrasenya}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <p className="text-sm text-gray-600 mt-2 mb-1 text-center">
            ¿No tienes una cuenta?
            <span
              className="text-blue-600 hover:underline font-medium"
              onClick={onClose}
            >
              <Link to="register"> Regístrate aquí</Link>
            </span>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
