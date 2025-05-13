import type { FC } from "react";
import { SelectorLenguajeComponent } from "../SelectorLenguajeComponent/SelectorLenguajeComponent";

export const NavbarComponent: FC = () => {


  return (
    <>
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
      <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
        <span className="text-xl font-semibold">ProyectoXXXIV</span>
      </div>

      {/* Links Centrales */}
      <ul className="flex space-x-8 text-gray-700 font-medium">
        <li className="hover:text-black cursor-pointer">Catalogo</li>
        <li className="hover:text-black cursor-pointer">Mapa</li>
      </ul>

      {/* Iconos + Login + Idioma */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium cursor-pointer">Login</span>

        {/* Selector idioma */}
        <div className="w-14 h-8 border border-gray-300 rounded flex items-center justify-center text-xs font-bold">
            <SelectorLenguajeComponent />
        </div>
      </div>
    </nav>
    </>
  );
};
