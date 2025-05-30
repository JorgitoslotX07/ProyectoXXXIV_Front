import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/admin", label: "Panel Inicial" },
  { to: "/admin/usuarios", label: "Usuarios" },
  { to: "/admin/usuarios/validacion-carnet", label: "Validar Carnets" },
  { to: "/admin/vehiculos", label: "Vehículos" },
  { to: "/admin/vehiculos/seguimiento", label: "Seguimiento" },
  { to: "/admin/parkings", label: "Parkings" },
  { to: "/admin/noticias", label: "Noticias" }
];

export const SidebarAdminComponent :FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-800 p-6 space-y-4">
      <h2 className="text-lg font-bold">Admin</h2>
      <nav className="flex flex-col space-y-2">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`py-2 px-3 rounded-md hover:bg-gray-700 transition ${
              location.pathname === to ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}