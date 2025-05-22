import { type FC } from "react";
import { NoticiasComponent } from "../../components/NoticiasComponent/NoticiasComponent";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { SearchFastComponent } from "../../components/SearchFastComponent/SearchFastComponent";
import { Link } from "react-router-dom";

export const HomePage: FC<HomePageProps> = ({
  onClickOptionsPerfil,
  onLoginClick,
}) => {
  return (
    <>
      <Link to="/map">
        <div className="w-full h-40 relative group cursor-pointer overflow-hidden">
          <img
            src="/MapClick.png"
            alt="Mapa de ubicación"
            className="object-cover object-top w-full h-full transition-opacity duration-300"
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-60 transition-opacity duration-300 bg-black bg-opacity-50">
            <a
              href="/nueva-pagina"
              className="text-white  text-lg font-semibold px-4 py-2"
            >
              Ver en el mapa
            </a>
          </div>
        </div>
      </Link>

      <SearchFastComponent
        onClickOptionsPerfil={onClickOptionsPerfil}
        onLoginClick={onLoginClick}
      />
      <div className="mt-20 px-10">
        <NoticiasComponent />
      </div>

      <div className="mt-20 px-10">
        <CochesPromoComponent />
      </div>
    </>
  );
};
