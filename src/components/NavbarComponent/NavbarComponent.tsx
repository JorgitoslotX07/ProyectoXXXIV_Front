import type { FC } from "react";
import { SelectorLenguajeComponent } from "../SelectorLenguajeComponent/SelectorLenguajeComponent";
import { Link } from "react-router-dom";
import type { NavbarProps } from "../../interfaces/NavbarProps";
import { useUserStore } from "../../utils/userStore";
import { UserPopUpComponent } from "../UserPopUpComponent/UserPopUpComponent";
import ThemeButtonComponent from "../ThemeButtonComponent/ThemeButtonComponent";

export const NavbarComponent: FC<NavbarProps> = ({ onLoginClick }) => {
  const user = useUserStore((state) => state.token);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-[#090c10] text-gray-300">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
        <span className="text-xl font-semibold text-white">
          <Link to="/">ProyectoXXXIV</Link>
        </span>
      </div>

      <ul className="flex space-x-8 font-medium">
        <li className="hover:text-white transition-colors duration-200">
          <Link to="/catalog">Catálogo</Link>
        </li>
        <li className="hover:text-white transition-colors duration-200">
          <Link to="/map">Mapa</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        {user != null && user !== "" ? (
          <UserPopUpComponent />
        ) : (
          <span
            onClick={onLoginClick}
            className="cursor-pointer bg-white/10 text-white px-4 py-1.5 rounded-full hover:bg-white/20 transition duration-200"
          >
            Login
          </span>
        )}
        <ThemeButtonComponent />
        <div className="w-14 h-8 border border-gray-500 rounded flex items-center justify-center text-xs font-bold bg-[#111827] text-white">
          <SelectorLenguajeComponent />
        </div>
      </div>
    </nav>
  );
};
