import { type FC } from "react";
import { deleteCookiesLogin } from "../../utils/cookisLogin";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../utils/userStore";
import type { DesplegablePerfilProps } from "../../interfaces/DesplegablePerfilProps";

export const DesplegablePerfilComponent: FC<DesplegablePerfilProps> = ({
  optionsPerfil,
  setOptionsPerfil,
}) => {
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setOptionsPerfil(!optionsPerfil);
  };

  const closeSesion = () => {
    navigate("/");
    deleteCookiesLogin();

    setUser("");
    setToken("");
  };

  return (
    <div className="relative">
      <svg
        onClick={toggleDropdown}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-700 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0"
        />
      </svg>

      {optionsPerfil && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Configuración
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={closeSesion}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};
