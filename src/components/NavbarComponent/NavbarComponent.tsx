import type { FC } from "react";
import { SelectorLenguajeComponent } from "../SelectorLenguajeComponent/SelectorLenguajeComponent";
import { Link } from "react-router-dom";
import type { NavbarProps } from "../../interfaces/NavbarProps";
import { useUserStore } from "../../hooks/userStore";
import { UserPopUpComponent } from "../UserPopUpComponent/UserPopUpComponent";
import ThemeButtonComponent from "../ThemeButtonComponent/ThemeButtonComponent";
import { useTranslation } from "react-i18next";

interface Props extends NavbarProps {
  modoClaro: boolean;
}

export const NavbarComponent: FC<Props> = ({ onLoginClick, modoClaro }) => {
  const user = useUserStore((state) => state.token);
  const { t } = useTranslation();

  return (
    <nav
      className={`flex justify-between items-center px-6 py-4 shadow-md transition-all duration-300 ${
        modoClaro ? "bg-[#FFFDF2] text-[#333]" : "bg-[#070F1A] text-gray-300"
      }`}
    >
      {/* Logo y título */}
      <div className="flex items-center space-x-2">
        <img src="/logo.webp" alt="Logo" className="w-8 h-8 object-contain" />
        <span className={`text-xl font-semibold ${modoClaro ? "text-[#222]" : "text-white"}`}>
          <Link to="/">Share&Go34</Link>
        </span>
      </div>

      {/* Enlaces */}
      <ul className="flex space-x-8 font-medium">
        <li
          className={`transition-colors duration-200 ${
            modoClaro ? "hover:text-black" : "hover:text-white"
          }`}
        >
          <Link to="/catalog">{t("navbar.catalog")}</Link>
        </li>
        <li
          className={`transition-colors duration-200 ${
            modoClaro ? "hover:text-black" : "hover:text-white"
          }`}
        >
          <Link to="/map">{t("navbar.map")}</Link>
        </li>
      </ul>

      {/* Botones y selector */}
      <div className="flex items-center space-x-4">
        {user != null && user !== "" ? (
          <UserPopUpComponent />
        ) : (
          <span
            onClick={onLoginClick}
            className={`cursor-pointer px-4 py-1.5 rounded-full transition duration-200 ${
              modoClaro
                ? "bg-yellow-400 text-[#333] hover:bg-yellow-500"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {t("navbar.login")}
          </span>
        )}
        <ThemeButtonComponent />
        <div
          className={`w-14 h-8 border rounded flex items-center justify-center text-xs font-bold transition ${
            modoClaro
              ? "bg-[#F1F1DA] border-[#ccc] text-[#333]"
              : "bg-[#111827] border-gray-500 text-white"
          }`}
        >
          <SelectorLenguajeComponent />
        </div>
      </div>
    </nav>
  );
};
