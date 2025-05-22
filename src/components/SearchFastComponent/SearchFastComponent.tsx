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
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState<string>(today);
  const [toDate, setToDate] = useState<string>(today);
  const searchFast: SearchFast = SearchFast();
  const [location, setLocation] = useState<string>("");
  // const [optionsLocation, setOptionsLocation] = useState<Array<string>>([]);
  const optionsLocation = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Bilbao",
    "Zaragoza",
    "Granada",
    "Málaga",
    "Toledo",
    "Córdoba",
    "Valladolid",
    "Salamanca",
    "Oviedo",
    "Gijón",
    "Pamplona",
    "San Sebastián",
    "Alicante",
    "Murcia",
  ];

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<Array<string>>("/vehiculos/ubicaciones");
      if (data) {
        // setOptionsLocation(data);
      }
    };

    fetch();
  }, []);

  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  const claseSelecionada: string =
    "bg-green-600 text-white hover:bg-green-500 cursor-pointer flex items-center px-4 py-2 gap-2";
  const claseNoSelecionada: string =
    "bg-white text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center px-4 py-2 gap-2";

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

  const actualizarFechaDesde = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;
    setFromDate(newFromDate);

    if (newFromDate > toDate) {
      setToDate(newFromDate);
    }
  };

  const actualizarFehcaHasta = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  const onSubmit = () => {
    searchFast.types = optionsSelected;
    searchFast.locate = location;
    searchFast.fromDate = fromDate;
    searchFast.toDate = toDate;
  };

  const manejarSeleccionUbicacion = (ubicacion: string) => {
    setLocation(ubicacion);
    setMostrarDesplegable(false);
  };

  return (
    <>
      <div
        className="flex flex-col lg:flex-row items-start gap-12 px-10"
        onClick={onClickOutEmergent}
      >
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mt-20 mb-10">
            Titulo, no se que poner
          </h1>

          <div className="flex rounded-md overflow-hidden mb-10 border border-gray-300 w-max">
            <button
              className={
                optionsSelected.includes("Turismos")
                  ? claseSelecionada
                  : claseNoSelecionada
              }
              onClick={() => addOrDeleteOption("Turismos")}
            >
              <img src="/turismo.png" alt="Car icon" className="w-8 h-8" />
              Turismos
            </button>
            <button
              className={
                optionsSelected.includes("SUV")
                  ? claseSelecionada
                  : claseNoSelecionada
              }
              onClick={() => addOrDeleteOption("SUV")}
            >
              <img src="/suv.png" alt="Van icon" className="w-8 h-8" />
              SUV's
            </button>
            <button
              className={
                optionsSelected.includes("Monovolumen")
                  ? claseSelecionada
                  : claseNoSelecionada
              }
              onClick={() => addOrDeleteOption("Monovolumen")}
            >
              <img src="/monovolumen.png" alt="Van icon" className="w-8 h-8" />
              Monovolumen
            </button>
            <button
              className={
                optionsSelected.includes("Microcoche")
                  ? claseSelecionada
                  : claseNoSelecionada
              }
              onClick={() => addOrDeleteOption("Microcoche")}
            >
              <img src="/MicroCoche.webp" alt="Van icon" className="w-8 h-8" />
              Microcoche
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 w-full max-w-xl">
              <svg
                className="w-6 h-6 text-gray-400 mr-2"
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
                onBlur={() =>
                  setTimeout(() => setMostrarDesplegable(false), 100)
                }
                placeholder="Ubicación"
                className="w-full focus:outline-none cursor-pointer"
              />
            </div>

            {mostrarDesplegable && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-2 w-full max-w-xl shadow-lg max-h-60 overflow-y-auto">
                {optionsLocation.map((ubicacion) => (
                  <li
                    key={ubicacion}
                    onClick={() => manejarSeleccionUbicacion(ubicacion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                  >
                    {ubicacion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Del</span>
            <input
              type="date"
              className="border border-gray-400 rounded-md px-4 py-2 hover:text-black cursor-pointer"
              value={fromDate}
              min={today}
              onChange={actualizarFechaDesde}
            />
            <span className="text-gray-700 font-medium">al</span>
            <input
              type="date"
              className="border border-gray-400 rounded-md px-4 py-2 hover:text-black cursor-pointer"
              defaultValue={fromDate}
              min={fromDate}
              value={toDate}
              onChange={actualizarFehcaHasta}
            />

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-colors duration-200"
              onClick={() => console.log("Buscar clicado")}
            >
              Buscar
            </button>
          </div> */}

          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Del</span>
              <input
                type="date"
                className="border border-gray-400 rounded-md px-4 py-2 hover:text-black cursor-pointer"
                value={fromDate}
                min={today}
                onChange={actualizarFechaDesde}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">al</span>
              <input
                type="date"
                className="border border-gray-400 rounded-md px-4 py-2 hover:text-black cursor-pointer"
                value={toDate}
                min={fromDate}
                onChange={actualizarFehcaHasta}
              />
            </div>

            <button
              className=" cursor-pointer ml-30 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors duration-200"
              onClick={() => onSubmit()}
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="hidden lg:block w-80 h-80 bg-gray-200 rounded-md flex justify-center items-center mt-20">
          {/* a reemplazar esto con una imagen */}
          <svg
            className="w-24 h-24 text-gray-400 "
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm0 2h12v10H4V5zm2 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
        </div>
      </div>
    </>
  );
};
