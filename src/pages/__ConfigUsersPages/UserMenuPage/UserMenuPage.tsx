import { useNavigate, Link } from "react-router-dom";
import { deleteCookiesLogin } from "../../../utils/cookisLogin";
import { useUserStore } from "../../../hooks/userStore";
import { useEffect, useState } from "react";
import { httpGetTok } from "../../../utils/apiService";
import { UsuarioMe } from "../../../interfaces/Usuario";
import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import { useTranslation } from "react-i18next";
import type { ModoClaroProps } from "../../../interfaces/ModoClaroProps";

const UserMenuPage: React.FC<ModoClaroProps> = ({ modoClaro }) => {
  const navigate = useNavigate();
  const setToken = useUserStore((state) => state.setToken);
  const [usuario, setUsuario] = useState<UsuarioMe>(UsuarioMe);
  const { t } = useTranslation();

  const logOut = () => {
    deleteCookiesLogin();
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioMe>("/usuarios/me");
      if (data) setUsuario(data);
    };
    fetch();
  }, []);

  const sections = [
    {
      icon: "🚗",
      title: t("userMenu.reservations"),
      onClick: () => navigate("reservas"),
    },
    {
      icon: "🔑",
      title: t("userMenu.changePassword"),
      onClick: () => navigate("pass"),
    },
    {
      icon: "✅",
      title: t("userMenu.verification"),
      onClick: () => navigate("veri-user"),
    },
    // {
    //   icon: "📜",
    //   title: t("userMenu.history"),
    //   onClick: () => navigate("historial"),
    // },
    {
      icon: "📤",
      title: t("userMenu.logout"),
      onClick: logOut,
    },
  ];

  return (
    <FondoPanelComponent modoClaro={modoClaro}>
      <div className={`relative min-h-screen p-8 ${modoClaro ? "text-[#222]" : "text-white"}`}>
        <TituloComponent titulo={t("userMenu.title")} runtaOut="/" modoClaro={modoClaro} />

        <div className="relative flex flex-col lg:flex-row gap-8">
          <div
            className={`relative w-full max-w-xs rounded-3xl p-4 shadow-md border mx-auto text-center justify-center transition-all ${
              modoClaro
                ? "bg-white border-gray-200 text-[#222]"
                : "bg-white/5 backdrop-blur-md border-white/10 text-white"
            }`}
          >
            <Link to="editar-perfil">
              <button className="absolute top-3 right-3 text-orange-400 hover:text-green-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z" />
                </svg>
              </button>
            </Link>

            <div className="relative w-28 h-28 mx-auto mb-2">
              {usuario.fotoUrl ? (
                <img
                  src={usuario.fotoUrl}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-4 border-orange-400/30 mb-4 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full border-4 border-orange-400/30 mb-4 shadow-md flex items-center justify-center bg-orange-100 dark:bg-orange-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14 text-orange-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.1 0-9.3 1.6-9.3 4.7v1.1c0 .6.5 1.1 1.1 1.1h16.4c.6 0 1.1-.5 1.1-1.1v-1.1c0-3.1-6.2-4.7-9.3-4.7z" />
                  </svg>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold">{usuario.username}</h2>
            <div className={`mt-2 space-y-1 text-sm ${modoClaro ? "text-gray-600" : "text-white"}`}>
              <p>
                <span className={`${modoClaro ? "text-black" : "text-[#A7F3D0]"} font-medium`}>Email:</span> {usuario.email}
              </p>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col space-y-4">
            {sections.map(({ icon, title, onClick }, i) => (
              <div
                key={i}
                onClick={onClick}
                className={`flex items-center justify-between rounded-2xl p-4 shadow-md border cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95 ${
                  modoClaro
                    ? "bg-white border-gray-200 text-[#222]"
                    : "bg-white/5 backdrop-blur-md border-white/10 text-white"
                } ${i === sections.length - 1 ? "hover:bg-[#F93943]/60 text-black" : ""}`}
              >
                <div className="text-3xl">{icon}</div>
                <div className="flex-1 ml-4 text-base font-medium">{title}</div>
                <div className="text-purple-300 text-xl">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FondoPanelComponent>
  );
};

export default UserMenuPage;
