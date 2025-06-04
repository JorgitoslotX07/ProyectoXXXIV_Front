import { type FC } from "react";
import type { CardProductProps } from "../../interfaces/CardProductProps";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props extends CardProductProps {
  modoClaro: boolean;
}

export const CardcocheComponent: FC<Props> = ({ coche, index, modoClaro }) => {
  const { t } = useTranslation();

  return (
    <Link to="/catalog/carDetail" state={coche.id} key={index}>
      <div
        className={`shadow-lg rounded-2xl p-4 w-full max-w-sm transition-all duration-300 ${
          modoClaro
            ? "bg-[#FFFBEA] text-[#444] border border-yellow-300"
            : "bg-[#1F2937] text-white"
        }`}
      >
        {coche.imagen ? (
          <img
            src={coche.imagen}
            alt={`${coche.marca} ${coche.modelo}`}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        ) : (
          <div
            className={`w-full h-40 rounded-xl mb-4 flex items-center justify-center text-gray-400 ${
              modoClaro ? "bg-yellow-100 text-yellow-500" : "bg-gray-700"
            }`}
          >
            {t("card.sinImagen")}
          </div>
        )}

        <h2
          className={`text-xl font-bold mb-1 ${
            modoClaro ? "text-yellow-600" : "text-[#C4B5FD]"
          }`}
        >
          {coche.marca} {coche.modelo}
        </h2>

        <p className={`${modoClaro ? "text-gray-600" : "text-gray-300"} mb-1`}>
          {t("card.ciudad")}:{" "}
          <span className={`${modoClaro ? "text-black" : "text-white"} font-semibold`}>
            {coche.localidad}
          </span>
        </p>

        <p className={`${modoClaro ? "text-gray-600" : "text-gray-300"} mb-1`}>
          {t("card.autonomia")}:{" "}
          <span className={`${modoClaro ? "text-black" : "text-white"} font-semibold`}>
            {coche.autonomia} km
          </span>
        </p>
      </div>
    </Link>
  );
};
