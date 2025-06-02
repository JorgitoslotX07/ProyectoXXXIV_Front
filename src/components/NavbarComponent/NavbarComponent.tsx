import type { FC } from "react";
import { SelectorLenguajeComponent } from "../SelectorLenguajeComponent/SelectorLenguajeComponent";
import { Link } from "react-router-dom";
import type { NavbarProps } from "../../interfaces/NavbarProps";
import { useUserStore } from "../../hooks/userStore";
import { UserPopUpComponent } from "../UserPopUpComponent/UserPopUpComponent";
import ThemeButtonComponent from "../ThemeButtonComponent/ThemeButtonComponent";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext"; // 🟣 Importa el context

export const NavbarComponent: FC<NavbarProps> = ({ onLoginClick }) => {
  const user = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme(); // 🟣 Usa el hook
  console.log(darkMode)
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-pink-100 text-pink-900 dark:bg-[#070F1A] dark:text-gray-300 transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.webp" alt="Logo" className="w-8 h-8 object-contain" />
        <span className="text-xl font-semibold text-pink-700 dark:text-white">
          <Link to="/">Share&Go34</Link>
        </span>
      </div>

      {/* Menú principal */}
      <ul className="flex space-x-8 font-medium">
        <li className="hover:text-pink-600 dark:hover:text-white transition-colors duration-200">
          <Link to="/catalog">{t("navbar.catalog")}</Link>
        </li>
        <li className="hover:text-pink-600 dark:hover:text-white transition-colors duration-200">
          <Link to="/map">{t("navbar.map")}</Link>
        </li>
      </ul>

      {/* Zona derecha: login / tema / idioma */}
      <div className="flex items-center space-x-4">
        {user != null && user !== "" ? (
          <UserPopUpComponent />
        ) : (
          <span
            onClick={onLoginClick}
            className="cursor-pointer bg-pink-200 text-pink-800 dark:bg-white/10 dark:text-white px-4 py-1.5 rounded-full hover:bg-pink-300 dark:hover:bg-white/20 transition duration-200"
          >
            {t("navbar.login")}
          </span>
        )}

        {/* 🌙/☀️ Botón modo claro/oscuro */}
        <ThemeButtonComponent
          toggleDark={toggleDarkMode}
        />

        {/* 🌐 Idioma */}
        <div className="w-14 h-8 border border-pink-300 dark:border-gray-500 rounded flex items-center justify-center text-xs font-bold bg-white dark:bg-[#111827] text-pink-800 dark:text-white">
          <SelectorLenguajeComponent />
        </div>
      </div>
    </nav>
  );
};
