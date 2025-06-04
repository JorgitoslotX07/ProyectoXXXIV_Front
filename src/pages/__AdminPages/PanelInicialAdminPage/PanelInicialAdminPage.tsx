import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { ModoClaroProps } from "../../../interfaces/ModoClaroProps";

export const PanelInicialAdminPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const adminItems = [
    {
      icon: "👥",
      title: t("adminPanel.users.title"),
      description: t("adminPanel.users.description"),
      route: "/admin/usuarios",
    },
    {
      icon: "🚗",
      title: t("adminPanel.vehicles.title"),
      description: t("adminPanel.vehicles.description"),
      route: "/admin/vehiculos",
    },
    {
      icon: "📍",
      title: t("adminPanel.parkings.title"),
      description: t("adminPanel.parkings.description"),
      route: "/admin/parkings",
    },
    {
      icon: "📰",
      title: t("adminPanel.news.title"),
      description: t("adminPanel.news.description"),
      route: "/admin/noticias",
    },
  ];

  return (
    <div
      className={`rounded-xl min-h-screen p-8 transition-all duration-300 ${
        modoClaro
          ? "bg-gradient-to-br from-[#fef9c3] to-[#e0fbea] text-[#111]" 
          : "bg-[rgb(22,23,64)] [background-image:radial-gradient(at_47%_33%,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] text-white"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-10">
        {t("adminPanel.title")}
      </h1>

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
