import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  modoClaro: boolean;
}

const adminItems = [
  {
    icon: "👥",
    title: "Gestión de Usuarios",
    description: "Agregar, editar, validar y eliminar usuarios.",
    route: "/admin/usuarios",
  },
  {
    icon: "🚗",
    title: "Gestión de Vehículos",
    description: "Control y seguimiento de vehículos.",
    route: "/admin/vehiculos",
  },
  {
    icon: "📍",
    title: "Mapa de Parkings",
    description: "Crear y administrar parkings en el mapa.",
    route: "/admin/parkings",
  },
  {
    icon: "📰",
    title: "Noticias",
    description: "Publicar y gestionar novedades.",
    route: "/admin/noticias",
  },
];

export const PanelInicialAdminPage: FC<Props> = ({ modoClaro }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        modoClaro
          ? "bg-gradient-to-br from-[#fef9c3] to-[#e0fbea] text-[#111]"
          : "bg-[rgb(22,23,64)] [background-image:radial-gradient(at_47%_33%,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] text-white"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-10">Panel de Administración</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {adminItems.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.route)}
            className={`rounded-2xl p-6 border cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95 shadow-xl ${
              modoClaro
                ? "bg-white/80 border-gray-300 text-[#111] hover:shadow-md"
                : "bg-white/5 border-white/10 text-white hover:shadow-lg"
            }`}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
            <p className={`text-sm ${modoClaro ? "text-gray-600" : "text-gray-300"}`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
