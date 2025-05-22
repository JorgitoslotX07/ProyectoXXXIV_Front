import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
// import { usuarios } from "../../utils/verificaciones";
import { deleteCookiesLogin } from "../../utils/cookisLogin";
import { useUserStore } from "../../utils/userStore";
import { useEffect, useState } from "react";
import { httpGet } from "../../utils/apiService";
import {
  usuarioCompletoVacio,
  type UsuarioCompleto,
} from "../../interfaces/Usuario";

const UserId = "11";

export const UserMenuPage = () => {
  const navigate = useNavigate();
  const setToken = useUserStore((state) => state.setToken);
  const [usuario, setUsuario] = useState<UsuarioCompleto>(usuarioCompletoVacio);

  const logOut = () => {
    deleteCookiesLogin();
    setToken("");
    navigate("/");
  };

  // pendiente peticion a back para coger el user a partir del token

  // const user: UsuarioCompleto =
  // UsuarioCompleto();

  // user.usuario = "Dani Sánchez Aránega";
  // user.email = "danisancheza@gmail.com";
  // user.fechaNacimiento = "1998-02-21";
  // user.dni = "39963548J";

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

  const sections = [
    {
      icon: "🚗",
      title: "Mis Reservas",
      onClick: () => navigate("/reservas"),
    },
    {
      icon: "📍",
      title: "Ubicación Actual",
      onClick: () => navigate("/ubicacion"),
    },
    {
      icon: "💳",
      title: "Métodos de Pago",
      onClick: () => navigate("/pagos"),
    },
    {
      icon: "🕒",
      title: "Historial de Viajes",
      onClick: () => navigate("/historial"),
    },
    {
      icon: "🔒",
      title: "Seguridad",
      onClick: () => navigate("/seguridad"),
    },
    {
      icon: "📤",
      title: "Cerrar Sesión",
      onClick: logOut,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-lg  cursor-pointer"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold">Panel de Usuario</h1>
        <Link to="/panel">
          <button className="text-xl  cursor-pointer">⚙️</button>
        </Link>
      </div>

      <div className="flex gap-6">
        <div className="w-90 h-100 aspect-square bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center">
          {usuario.avatar != null && (
            <img
              src={usuario.avatar}
              alt="Avatar"
              className="w-25 h-25 rounded-full border-4 border-gray-300 mb-10"
            />
          )}
          <h2 className="text-2xl font-bold mt-4">{usuario.usuario}</h2>
          <p className="text-base text-gray-700 mt-1">
            <span className="font-bold">Email: </span> {usuario.email}
          </p>
          <p className="text-base text-gray-700 mt-1">
            <span className="font-bold">Fecha de nacimiento: </span>
            {usuario.fechaNacimiento}
          </p>
          <p className="text-base text-gray-700 mt-1">
            <span className="font-bold">DNI: </span> {usuario.dni}
          </p>

          <Link to="/editar-perfil">
            <button className="text-blue-500 text-base mt-2 hover:underline cursor-pointer">
              ✏️ Editar perfil
            </button>
          </Link>
        </div>

        <div className="flex-1 space-y-3">
          {sections.map(({ icon, title, onClick }, i) => (
            <motion.div
              key={i}
              onClick={() => onClick()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-between bg-white rounded-2xl p-2.5 shadow-md cursor-pointer transition"
            >
              <div className="text-3xl">{icon}</div>
              <div className="flex-1 ml-4 text-base font-medium">{title}</div>
              <div className="text-gray-400 text-xl">→</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
