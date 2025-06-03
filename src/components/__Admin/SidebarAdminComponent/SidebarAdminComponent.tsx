import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

export const SidebarAdminComponent: FC = () => {
  const location = useLocation();
  const { modoClaro } = useThemeContext();
  const { t } = useTranslation();

  const links = [
    { to: "/admin", label: t("sidebarAdmin.initialPanel") },
    { to: "/admin/usuarios", label: t("sidebarAdmin.users") },
    { to: "/admin/usuarios/validacion-carnet", label: t("sidebarAdmin.validateLicenses") },
    { to: "/admin/vehiculos", label: t("sidebarAdmin.vehicles") },
    { to: "/admin/vehiculos/seguimiento", label: t("sidebarAdmin.tracking") },
    { to: "/admin/parkings", label: t("sidebarAdmin.parkings") },
    { to: "/admin/noticias", label: t("sidebarAdmin.news") },
  ];

  return (
    <aside
      className={`w-64 p-6 shadow-md transition-colors duration-300 ${
        modoClaro
          ? "bg-gradient-to-b from-[#fdf6e3] via-[#fef9ef] to-[#fefcea] text-[#3a3a3a]"
          : "bg-[#111827] text-gray-200"
      }`}
    >
      <h2
        className={`text-lg font-bold mb-6 pb-2 border-b ${
          modoClaro ? "border-[#f5e9c8]" : "border-gray-700"
        }`}
      >
        {t("sidebarAdmin.title")}
      </h2>
      <nav className="flex flex-col space-y-2">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`py-2 px-3 rounded-md transition duration-200 ${
              location.pathname === to
                ? modoClaro
                  ? "bg-[#fdf1cd] text-[#2b2b2b] font-semibold"
                  : "bg-[#1f2937] text-white font-semibold"
                : modoClaro
                ? "hover:bg-[#fdf6df]"
                : "hover:bg-[#1f1f2f]"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
