import { type FC } from "react";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { SearchFastComponent } from "../../components/SearchFastComponent/SearchFastComponent";
// import CochesMapComponent from "../../components/CochesMapComponent/CochesMapComponent";

export const HomePruPage: FC<HomePageProps> = ({
  onClickOptionsPerfil,
  onLoginClick,
}) => {
  return (
    <>
      {/* <div className="w-full h-40 relative">
        <img
          src="/MapClick.png"
          alt="Mapa de ubicación"
          className="object-cover object-top w-full h-full"
        />
      </div> */}
      <div className="w-full h-40 relative group cursor-pointer overflow-hidden">
        <img
          src="/MapClick.png"
          alt="Mapa de ubicación"
          className="object-cover object-top w-full h-full transition-opacity duration-300"
        />

        {/* Overlay con mensaje */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-60 transition-opacity duration-300 bg-black bg-opacity-50">
          <a
            href="/nueva-pagina"
            className="text-white  text-lg font-semibold px-4 py-2"
          >
            Ver en el mapa
          </a>
        </div>
      </div>

      <SearchFastComponent
        onClickOptionsPerfil={onClickOptionsPerfil}
        onLoginClick={onLoginClick}
      />
      {/* <div className="mt-20 px-10">
        <NoticiasComponent />
      </div>

      <div className="mt-20 px-10">
        <CochesPromoComponent />
      </div> */}
    </>
  );
};
