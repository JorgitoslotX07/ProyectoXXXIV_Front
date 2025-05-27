import { useEffect, useState, type FC, type ReactElement } from "react";
import { SearchFast } from "../../interfaces/SearchFast";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { httpGet } from "../../utils/apiService";

export const SearchFastComponent: FC<HomePageProps> = ({
  onClickOptionsPerfil,
  onLoginClick,
}): ReactElement => {
  const [optionsSelected, setOptionsSelected] = useState<Array<string>>([
    "Turismos",
  ]);
  const searchFast: SearchFast = SearchFast();
  const [location, setLocation] = useState<string>("");
  const [optionsLocation, setOptionsLocation] = useState<Array<string>>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<Array<string>>("/vehiculos/localidades");
      if (data) {
        setOptionsLocation(data);
      }
    };

    fetch();
  }, []);

  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  const tipos = [
    { label: "Turismos", icon: "/turismo.png" },
    { label: "SUV", icon: "/suv.png" },
    { label: "Monovolumen", icon: "/monovolumen.png" },
    { label: "Microcoche", icon: "/MicroCoche.webp" },
  ];

  const addOrDeleteOption = (carType: string) => {
    setOptionsSelected((prevOptions) => {
      if (prevOptions.includes(carType)) {
        return prevOptions.filter((option) => option !== carType);
      } else {
        return [...prevOptions, carType];
      }
    });
  };

  const onClickOutEmergent = () => {
    onLoginClick();
    onClickOptionsPerfil();
  };

  const onSubmit = () => {
    searchFast.types = optionsSelected;
    searchFast.locate = location;
  };

  const manejarSeleccionUbicacion = (ubicacion: string) => {
    setLocation(ubicacion);
    setMostrarDesplegable(false);
  };

  return (
    <div
      className="flex items-center justify-center px-4 py-12  min-h-[calc(100vh-300px)] " // Ajusta 300px a la altura de tu mapa bg-[#0B1120]
      onClick={onClickOutEmergent}
    >
      <div className="w-full max-w-screen-lg text-white text-center space-y-8">
        <h1 className="text-4xl font-bold text-[#C4B5FD]">
          Encuentra tu próximo coche
        </h1>

        <div className="flex flex-wrap justify-center gap-3">
          {tipos.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => addOrDeleteOption(label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
                optionsSelected.includes(label)
                  ? "bg-[#A7F3D0] text-[#111827] border-transparent shadow-md"
                  : "bg-transparent border-gray-500 hover:bg-[#374151]"
              }`}
            >
              <img src={icon} alt={label} className="w-6 h-6" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        

        <div className="flex items-center w-full max-w-2xl mx-auto">
          <div className="flex items-center border border-gray-600 bg-[#1F2937] rounded-l-full px-4 py-3 w-full">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
            </svg>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setMostrarDesplegable(true)}
              onBlur={() => setTimeout(() => setMostrarDesplegable(false), 100)}
              placeholder="Buscar ubicación..."
              className="bg-transparent text-white w-full focus:outline-none placeholder-gray-400"
            />
          </div>

          <button
            onClick={onSubmit}
            className="bg-white/80 text-gray-900 font-semibold px-6 py-3 rounded-r-full shadow-sm hover:bg-white transition duration-200 backdrop-blur-md border-t border-b border-r border-gray-600"
          >
            Buscar
          </button>
        </div>


        {mostrarDesplegable && (
          <ul className="absolute z-10 bg-[#1F2937] border border-gray-600 rounded-md mt-2 w-full shadow-lg max-h-60 overflow-y-auto text-left">
            {optionsLocation.map((ubicacion) => (
              <li
                key={ubicacion}
                onClick={() => manejarSeleccionUbicacion(ubicacion)}
                className="px-4 py-2 hover:bg-[#374151] cursor-pointer text-white"
              >
                {ubicacion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
