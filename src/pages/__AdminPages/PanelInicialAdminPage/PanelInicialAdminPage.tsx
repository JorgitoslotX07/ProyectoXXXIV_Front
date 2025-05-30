import type { FC } from "react";
import { useNavigate } from "react-router-dom";

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
]

export const PanelInicialAdminPage: FC = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-10">Panel de Administración</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {adminItems.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.route)}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow hover:shadow-lg cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
