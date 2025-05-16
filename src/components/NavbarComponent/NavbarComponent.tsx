import type { FC } from "react";
import { SelectorLenguajeComponent } from "../SelectorLenguajeComponent/SelectorLenguajeComponent";
import { Link } from "react-router-dom";
import { useUserStore } from "../../utils/userStore";
import { DesplegablePerfilComponent } from "../DesplegablePerfilComponent/DesplegablePerfilComponent";
import type { NavbarProps } from "../../interfaces/NavbarProps";

export const NavbarComponent: FC<NavbarProps> = ({
  onLoginClick,
  setOptionsPerfil,
  optionsPerfil,
}) => {
  const user = useUserStore((state) => state.user);

  const clickNavbar = () => {
    if (optionsPerfil) {
      setOptionsPerfil(false);
    }
  };

  return (
    <nav
      className="flex justify-between items-center px-6 py-4 shadow-md bg-white"
      onClick={clickNavbar}
    >
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
        <span className="text-xl font-semibold">
          <Link to="/">ProyectoXXXIV</Link>
        </span>
      </div>

      <ul className="flex space-x-8 text-gray-700 font-medium">
        <li className="hover:text-black cursor-pointer">
          <Link to="/catalog">Catálogo</Link>
        </li>
        <li className="hover:text-black cursor-pointer">
          <Link to="/map">Mapa</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        {user != null && user != "" ? (
          <DesplegablePerfilComponent
            optionsPerfil={optionsPerfil}
            setOptionsPerfil={setOptionsPerfil}
          />
        ) : (
          <span
            onClick={onLoginClick}
            className="text-gray-700 font-medium cursor-pointer"
          >
            Login
          </span>
        )}

        <div className="w-14 h-8 border border-gray-300 rounded flex items-center justify-center text-xs font-bold">
          <SelectorLenguajeComponent />
        </div>
      </div>
    </nav>
  );
};
