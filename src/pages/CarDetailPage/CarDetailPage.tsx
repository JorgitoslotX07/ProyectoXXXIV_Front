import { useState, useEffect, type FC } from "react";
import { useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import { Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet, httpGetTok } from "../../utils/apiService";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";
import { useTranslation } from "react-i18next";
import { ModalPaymentComponent } from "../../components/Modal/ModalPaymentComponent/ModalPaymentComponent";
import type { DataPayment } from "../../interfaces/PaymentProps";
import type { CalificionProps } from "../../interfaces/CalificacionProps";
import type { ModoClaroProps } from "../../interfaces/ModoClaroProps";

export const CarDetailPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { state } = location;
  const product: number = state;
  const [vehiculo, setVehiculo] = useState<Vehiculo>(Vehiculo);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [calificaciones, setCalificaciones] = useState<CalificionProps[]>();

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<Vehiculo>("/vehiculos/" + product);
      console.log(data);
      if (data) setVehiculo(data);
    };
    fetch();
  }, [product]);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<CalificionProps[]>(
        "/calificaciones/vehiculo/" + product
      );
      if (data) setCalificaciones(data);
    };
    fetch();
  }, [product]);

  const peticionPago = async (data: DataPayment) => {
    console.log(data);
  };
  return (
    <div
      className={`min-h-screen font-sans px-4 sm:px-6 md:px-10 pt-20 pb-32 ${
        modoClaro
          ? "bg-[#f9fafb] text-[#1f2937]"
          : "bg-[#111827] text-white [background-image:radial-gradient(at_47%_33%,hsl(163,80%,20%)_0,transparent_59%),radial-gradient(at_82%_65%,hsl(218,75%,14%)_0,transparent_55%)] bg-no-repeat bg-cover"
      }`}
    >
      {/* INFO VEHÍCULO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        <div className="w-full">
          <div
            className={`rounded-xl shadow-xl p-6 w-full border ${
              modoClaro
                ? "bg-white border-gray-200"
                : "bg-[rgba(31,41,55,0.6)] border-white/10 backdrop-blur-[18px] backdrop-saturate-[180%]"
            }`}
          >
            {vehiculo.imagen ? (
              <img
                src={vehiculo.imagen}
                alt="Vehículo"
                className="object-contain max-h-full max-w-full rounded-lg"
              />
            ) : (
              <div
                className={`w-full h-64 rounded flex items-center justify-center ${
                  modoClaro
                    ? "bg-gray-200 text-gray-600"
                    : "bg-gray-700 text-white"
                }`}
              >
                {t("carDetail.sinImagen")}
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <h1
            className={`text-3xl font-bold mb-1 ${
              modoClaro ? "text-yellow-600" : "text-[#C4B5FD]"
            }`}
          >
            {vehiculo.marca} {vehiculo.modelo}
          </h1>
          <p
            className={`mb-2 ${modoClaro ? "text-gray-700" : "text-gray-300"}`}
          >
            {t("carDetail.kilometraje")}:{" "}
            <span
              className={`font-semibold ${
                modoClaro ? "text-black" : "text-white"
              }`}
            >
              {vehiculo.kilometraje} km
            </span>
          </p>

          <p className="text-sm text-gray-500 mb-1">
            {t("carDetail.caracteristicas")}:
          </p>
          <ul
            className={`text-sm list-disc list-inside mb-6 ${
              modoClaro ? "text-gray-700" : "text-gray-200"
            }`}
          >
            <li className="flex items-start gap-2">
              <span className="font-semibold">{t("carDetail.tipo")}:</span>{" "}
              {t(`search.types.${vehiculo.tipo.toLowerCase()}`)}
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">{t("carDetail.puertas")}:</span>{" "}
              {vehiculo.puertas == "CINCO" ? 5 : 3}
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">{t("carDetail.autonomia")}:</span>{" "}
              {vehiculo.autonomia} km
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">
                {t("carDetail.ubicacionActual")}:
              </span>{" "}
              {vehiculo.localidad}
            </li>
          </ul>

          <button
            className={`w-full font-semibold py-3 rounded-md shadow-md mb-6 transition-colors ${
              modoClaro
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-[#C4B5FD] text-black hover:bg-[#a78bfa]"
            }`}
            onClick={() => setShowPaymentPopup(true)}
          >
            {t("carDetail.botonReservar")}
          </button>
        </div>
      </div>

      {/* CALIFICACIONES */}
      <div className="mt-10">
        {!showAllReviews && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {t("carDetail.reseñasDestacadas")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {calificaciones?.slice(0, 4).map((rev, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg shadow-md ${
                    modoClaro
                      ? "bg-white border border-gray-200"
                      : "bg-[rgba(31,41,55,0.6)]"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <img
                      src={rev.avatar}
                      alt={rev.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{rev.username}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < rev.calificacion
                                ? "fill-[#fbff0e] text-yellow-400"
                                : "fill-gray-300 text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm italic truncate text-gray-500">
                    "{rev.contenido}"
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* BOTÓN TOGGLE */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className={`text-sm font-medium hover:underline ${
            modoClaro ? "text-yellow-600" : "text-[#C4B5FD]"
          }`}
        >
          {showAllReviews
            ? t("carDetail.ocultarTodas")
            : t("carDetail.verTodas")}
        </button>
      </div>

      {/* TODAS LAS RESEÑAS */}
      {showAllReviews && (
        <div className="mt-16">
          <h2
            className={`text-2xl font-bold mb-6 text-center ${
              modoClaro ? "text-yellow-700" : "text-[#C4B5FD]"
            }`}
          >
            {t("carDetail.tituloTodasReseñas")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calificaciones?.map((rev, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg shadow-md ${
                  modoClaro
                    ? "bg-white border border-gray-200"
                    : "bg-[rgba(31,41,55,0.6)]"
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={rev.avatar}
                    alt={rev.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{rev.username}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${
                            j < rev.calificacion
                              ? "fill-[#fbff0e] text-yellow-400"
                              : "fill-gray-300 text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm italic truncate text-gray-500">
                  "{rev.contenido}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VEHÍCULOS PROMO */}
      <div className="mt-20">
        <CochesPromoComponent modoClaro={modoClaro} />
      </div>

      {/* POPUP DE RESERVA */}
      {showPaymentPopup && (
        <ModalPaymentComponent
          onClose={() => setShowPaymentPopup(false)}
          vehicle={vehiculo}
          onSubmit={peticionPago}
          modoClaro={modoClaro}
        />
      )}
    </div>
  );
};
