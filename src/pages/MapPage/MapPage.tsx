import type { FC } from "react";
import CochesMapComponent from "../../components/Maps/CochesMapComponent/CochesMapComponent";

interface Props {
  modoClaro: boolean;
}

export const MapPage: FC<Props> = ({ modoClaro }) => {
  return (
    <div
      className={`relative min-h-screen bg-no-repeat bg-cover transition-all duration-300 ${
        modoClaro
          ? "bg-[#FDFCE8] [background-image:radial-gradient(at_47%_33%,hsl(50,100%,88%)_0,transparent_59%),radial-gradient(at_82%_65%,hsl(120,40%,85%)_0,transparent_55%)]"
          : "bg-[#0d2854] [background-image:radial-gradient(at_47%_33%,hsl(163.5,83%,24%)_0,transparent_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)]"
      }`}
    >
      {/* Imagen de fondo estática (la de fondoMap.jpg) */}
      <div
        className={`absolute inset-0 bg-[url('/fondoMap.jpg')] bg-cover bg-center ${
          modoClaro ? "opacity-10" : "opacity-20"
        }`}
      ></div>

      {/* Capa de difuminado encima */}
      <div
        className={`absolute inset-0 ${
          modoClaro ? "backdrop-blur-[4px]" : "backdrop-blur-[5px]"
        }`}
      ></div>

      {/* Componente del mapa */}
      <CochesMapComponent modoClaro={modoClaro} />
    </div>
  );
};