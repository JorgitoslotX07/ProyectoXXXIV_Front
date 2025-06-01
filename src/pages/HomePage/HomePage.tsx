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

interface Props extends HomePageProps {
  modoClaro: boolean;
}

export const HomePage: FC<Props> = ({
  onClickOptionsPerfil,
  onLoginClick,
  modoClaro,
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
      <div
        className={`${
          modoClaro ? "bg-[#f3f4f6] text-[#1f2937]" : "bg-[rgb(22,23,64)] text-white"
        } backdrop-blur-[10px] backdrop-saturate-[100%] min-h-screen font-sans`}
      >
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

        <div className="pt-20 px-10">
          <CochesPromoComponent />
        </div>

        <div className="max-h-[45em] flex flex-col lg:flex-row items-stretch justify-between px-10 py-16 gap-10 relative overflow-hidden shadow-xl">
          <div
            className={`backdrop-blur-md backdrop-saturate-150 ${
              modoClaro ? "bg-white text-[#1f2937] border-gray-200" : "bg-black/35 text-white border-white/10"
            } rounded-2xl border p-8 shadow-lg`}
          >
            <h2 className="text-4xl font-bold text-[#C4B5FD] mb-4">
              {t("home.whyUseTitle")}
            </h2>
            <p
              className={`text-lg leading-relaxed mb-6 ${
                modoClaro ? "text-[#4b5563]" : "text-gray-300"
              }`}
            >
              {t("home.whyUseDescription")}
            </p>
            <ul
              className={`list-disc list-inside space-y-3 ${
                modoClaro ? "text-[#4b5563]" : "text-gray-300"
              }`}
            >
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
        </div>

        <div className="relative">
          <div className="mt-20 px-10 pb-20">
            <h2 className="text-2xl font-semibold mb-6 pl-3 text-[#C4B5FD]">
              {t("home.newsTitle")}
            </h2>
            <NoticiasComponent />
          </div>
        </div>

        <Link to="/map">
          <div
            className={`w-full h-40 relative group cursor-pointer overflow-hidden border ${
              modoClaro ? "border-gray-300" : "border-black"
            } rounded-md shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <img
              src="/MapClick.png"
              alt={t("home.mapImageAlt")}
              className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-60 transition-opacity duration-500"
            />
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                modoClaro ? "bg-white opacity-30" : "bg-black bg-opacity-60 opacity-40"
              } group-hover:opacity-60 transition-opacity duration-500`}
            >
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
