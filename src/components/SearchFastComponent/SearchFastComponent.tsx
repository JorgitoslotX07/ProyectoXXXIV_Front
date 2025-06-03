import { useEffect, useState, type FC, type ReactElement, useRef } from "react";
import { SearchFast } from "../../interfaces/SearchFast";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { httpGet } from "../../utils/apiService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props extends HomePageProps {
  modoClaro: boolean;
}

export const SearchFastComponent: FC<Props> = ({
  onClickOptionsPerfil,
  onLoginClick,
  modoClaro,
}): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [optionsSelected, setOptionsSelected] = useState<Array<string>>([
    t("search.types.turismos"),
  ]);
  const searchFast: SearchFast = SearchFast();
  const [location, setLocation] = useState<string>("");
  const [optionsLocation, setOptionsLocation] = useState<Array<string>>([]);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<Array<string>>("/vehiculos/localidades");
      if (data) {
        setOptionsLocation(data);
      }
    };
    fetch();
  }, []);

  const tipos = [
    { label: t("search.types.turismos"), icon: "/turismo.png", value: "TURISMOS" },
    { label: t("search.types.suv"), icon: "/suv.png" , value: "SUV" },
    { label: t("search.types.monovolumen"), icon: "/monovolumen.png" , value: "MONOVOLUMEN" },
    { label: t("search.types.microcoche"), icon: "/MicroCoche.webp" , value: "BIPLAZA" },
  ];

  // const addOrDeleteOption = (carType: string) => {
  //   setOptionsSelected((prevOptions) =>
  //     prevOptions.includes(carType)
  //       ? prevOptions.filter((option) => option !== carType)
  //       : [...prevOptions, carType]
  //   );
  // };

  const addOrDeleteOption = (carType: string) => {
    setOptionsSelected((prevOptions) => {
      if (prevOptions[0] === carType) {
        return prevOptions;
      } else {
        return [carType];
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

    const params = new URLSearchParams();

    if (optionsSelected.length > 0) {
      params.set("type", optionsSelected[0]);
      params.set("location", location);
    }
  
    navigate(`/map?${params.toString()}`);
  };

  const manejarSeleccionUbicacion = (ubicacion: string) => {
    setLocation(ubicacion);
    setMostrarDesplegable(false);
  };

  const botonRef = useRef<HTMLButtonElement | null>(null);

  const manejarClickUbicacion = () => {
    detectarUbicacion();
    if (botonRef.current) {
      botonRef.current.classList.remove("pulse-click");
      void botonRef.current.offsetWidth;
      botonRef.current.classList.add("pulse-click");
    }
  };

  const detectarUbicacion = () => {
    if (!navigator.geolocation) {
      alert(t("search.errors.geolocationNotSupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const direccionCompleta = data.display_name || "";
          if (direccionCompleta) setLocation(direccionCompleta);
        } catch (err) {
          console.error("Error al obtener la dirección:", err);
        }
      },
      (err) => {
        alert(t("search.errors.locationPermissionDenied"));
        console.error("Error obteniendo ubicación:", err);
      }
    );
  };

  return (
  <div
  className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-300px)]"
  onClick={onClickOutEmergent}
>
  <div className="w-full max-w-screen-lg text-center space-y-8">
  <h1
    className={`text-4xl font-bold ${
      modoClaro ? "text-green-100" : "text-[#C4B5FD]"
    }`}
    style={{
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
      filter: "sepia(0.4)",
    }}
  >
    {t("search.title")}
  </h1>

  <div className="flex flex-wrap justify-center gap-3">
  {tipos.map(({ label, icon, value}) => (
    <button
      key={label}
      onClick={() => addOrDeleteOption(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
        optionsSelected.includes(label)
          ? "bg-[#A7F3D0] text-[#111827] border-transparent shadow-md"
          : modoClaro
            ? "bg-black/20 text-white border-white/30 hover:bg-black/30"
            // : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            :"bg-black/20 text-white border-white/30 hover:bg-black/30"
      }`}
    >
      <img src={icon} alt={label} className="w-6 h-6" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  ))}
</div>

        <div className="relative inline-block w-full max-w-2xl mx-auto">
          <div className="flex items-center w-full max-w-2xl mx-auto">
            <button
              ref={botonRef}
              onClick={manejarClickUbicacion}
              // className="w-6.5 h-5.5 flex items-center justify-center mr-2 rounded-full border border-black bg-red-600 hover:bg-red-900 text-white font-bold transition-all"
              className="w-6.5 h-5.5 flex items-center justify-center mr-2 rounded-full  hover:bg-red-700 text-white font-bold transition-all"

              title={t("search.useCurrentLocation")}
            >📍</button>

            <div
              className={`flex items-center border rounded-l-full px-4 py-3 w-full ${modoClaro ? "bg-gray-100 border-gray-300" : "bg-[#1F2937] border-gray-600"
                }`}
            >
              <svg
                className={`w-5 h-5 mr-2 ${modoClaro ? "text-purple-600" : "text-purple-400"
                  }`}
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
                placeholder={t("search.placeholder")}
                className={`w-full bg-transparent focus:outline-none transition placeholder-opacity-100 ${modoClaro
                    ? "text-gray-800 placeholder:!text-gray-500"
                    : "text-white placeholder:!text-gray-400"
                  }`}
              />
            </div>

            <button
              onClick={onSubmit}
              className={`font-semibold px-6 py-3 rounded-r-full shadow-sm transition duration-200 backdrop-blur-md border-t border-b border-r ${modoClaro
                  ? "bg-white text-gray-900 hover:bg-gray-100 border-gray-300"
                  : "bg-white/80 text-gray-900 hover:bg-white border-gray-600"
                }`}
            >
              {t("search.button")}
            </button>
          </div>

          {mostrarDesplegable && (
            <ul
              className={`absolute left-0 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border shadow-xl backdrop-blur-sm ring-1 ring-black/10 z-20 ${modoClaro ? "bg-white border-gray-300" : "bg-[#1F2937] border-gray-600"
                }`}
            >
              {optionsLocation.map((ubicacion) => (
                <li
                  key={ubicacion}
                  onClick={() => manejarSeleccionUbicacion(ubicacion)}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 rounded-md mx-1 my-1 whitespace-nowrap overflow-hidden text-ellipsis ${modoClaro
                      ? "text-gray-800 hover:bg-gray-100 hover:text-black"
                      : "text-gray-100 hover:bg-[#4B5563] hover:text-white"
                    }`}
                  title={ubicacion}
                >
                  {ubicacion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
