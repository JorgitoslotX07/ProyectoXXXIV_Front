import { useEffect, type FC } from "react";
import { NoticiasComponent } from "../../components/NoticiasComponent/NoticiasComponent";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";
import { SearchFastComponent } from "../../components/SearchFastComponent/SearchFastComponent";
import { NotiToastComponent } from "../../components/NotiToastComponents/NotiToastComponet";
import {
  mostrarError,
  mostrarInfo,
  mostrarSuccess,
  mostrarWarning,
} from "../../utils/notiToast";
import { Link } from "react-router-dom";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { useTranslation } from "react-i18next";

export const HomePage: FC<HomePageProps> = ({
  onClickOptionsPerfil,
  onLoginClick,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    mostrarError("Error al Entrar");
    mostrarInfo("Info al Entrar");
    mostrarWarning("Warning al Entrar");
    mostrarSuccess("Success al Entrar");
  }, []);

  return (
    <>
      <div className="bg-[rgb(22,23,64)] text-white dark:bg-[#f3f4f6] dark:text-[#1f2937] backdrop-blur-[10px] backdrop-saturate-[100%] min-h-screen font-sans transition-colors duration-300">
        {/* 🔍 Sección de búsqueda inicial */}
        <div className="relative">
          <div className="absolute inset-0 bg-[url('fondoFastSeartch.webp')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>

          <div className="relative z-10 p-10">
            <SearchFastComponent
              onClickOptionsPerfil={onClickOptionsPerfil}
              onLoginClick={onLoginClick}
            />
          </div>
        </div>

        {/* 🔥 Coches Populares */}
        <div className="pt-20 px-10">
          <CochesPromoComponent />
        </div>

        {/* 🧊 Sección beneficios */}
  <div className="max-h-[45em] flex flex-col lg:flex-row items-stretch justify-between px-10 py-16 gap-10 relative overflow-hidden shadow-xl bg-white [background-image:none] dark:bg-[#cff7ee] dark:[background-image:radial-gradient(at_47%_33%,hsl(68.52,81%,60%)_0,transparent_59%),radial-gradient(at_82%_65%,hsl(42.97,100%,85%)_0,transparent_55%)]">
  <div className="backdrop-blur-[16px] backdrop-saturate-[180%] bg-white/80 text-[#1f2937] border border-gray-200 dark:bg-[rgba(17,25,40,0.75)] dark:text-white dark:border-[rgba(255,255,255,0.125)] rounded-[12px] p-8 shadow-xl">
    <h2 className="text-4xl font-bold text-yellow-400 dark:text-yellow-400 mb-4">
      {t("home.whyUseTitle")}
    </h2>
    <p className="text-lg leading-relaxed mb-6 text-[#4b5563] dark:text-gray-300">
      {t("home.whyUseDescription")}
    </p>
    <ul className="list-disc list-inside space-y-3 text-[#4b5563] dark:text-gray-300">
      <li>{t("home.whyUseBenefits.eco")}</li>
      <li>{t("home.whyUseBenefits.map")}</li>
      <li>{t("home.whyUseBenefits.filters")}</li>
      <li>{t("home.whyUseBenefits.fast")}</li>
    </ul>
  </div>

  <div className="lg:w-1/2 relative z-10">
    <img
      src="/public/fondo-desc-home-car.jpg"
      alt={t("home.promoImageAlt")}
      className="rounded-xl shadow-xl w-full h-full object-cover"
    />
  </div>




          <div className="lg:w-1/2 relative z-10">
            <img
              src="/public/fondo-desc-home-car.jpg"
              alt={t("home.promoImageAlt")}
              className="rounded-xl shadow-xl w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 📰 Noticias */}
        <div className="relative">
          <div className="mt-20 px-10 pb-20">
            <h2 className="text-2xl font-semibold mb-6 pl-3 text-[#C4B5FD]">
              {t("home.newsTitle")}
            </h2>
            <NoticiasComponent />
          </div>
        </div>

        {/* 🗺️ Botón hacia el mapa */}
        <Link to="/map">
          <div className="w-full h-40 relative group cursor-pointer overflow-hidden border border-black dark:border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src="/MapClick.png"
              alt={t("home.mapImageAlt")}
              className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-60 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-40 group-hover:opacity-60 dark:bg-white dark:opacity-30 transition-opacity duration-500">
              <span className="text-[#C4B5FD] text-lg font-semibold px-4 py-2 transition-colors duration-300">
                {t("home.mapButton")}
              </span>
            </div>
          </div>
        </Link>
      </div>
      <NotiToastComponent />
    </>
  );
};
