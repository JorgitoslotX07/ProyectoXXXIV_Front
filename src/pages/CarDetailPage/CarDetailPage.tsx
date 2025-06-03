import { useState, useEffect, type FC } from "react";
import { useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import { Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet, httpGetTok } from "../../utils/apiService";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";
import { useTranslation } from "react-i18next"; // 🟢 Importamos traducción
import { ModalPaymentComponent } from "../../components/Modal/ModalPaymentComponent/ModalPaymentComponent";
import type { DataPayment } from "../../interfaces/PaymentProps";
import type { CalificionProps } from "../../interfaces/CalificacionProps";

export const CarDetailPage: FC = () => {
  const { t } = useTranslation(); // 🟢 Usamos traducción
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
      if (data) setVehiculo(data);
    };
    fetch();
  }, [product]);

  async function peticionPago(data: DataPayment) {
    console.log(data)
  }

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<CalificionProps[]>("/calificaciones/vehiculo/" + product);
      if (data) setCalificaciones(data);
    };
    fetch();
  }, [product]);

  return (
    <div className="min-h-screen bg-[#111827] [background-image:radial-gradient(at_47%_33%,hsl(163,80%,20%)_0,transparent_59%),radial-gradient(at_82%_65%,hsl(218,75%,14%)_0,transparent_55%)] bg-no-repeat bg-cover text-white font-sans px-4 sm:px-6 md:px-10 pt-20 pb-32">

      {/* INFO VEHÍCULO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        <div className="w-full">
          <div className="backdrop-blur-[18px] backdrop-saturate-[180%] bg-[rgba(31,41,55,0.6)] border border-white/10 rounded-xl shadow-xl p-6 w-full">
            {vehiculo.imagen ? (
              <img
                src={vehiculo.imagen}
                alt="Vehículo"
                className="object-contain max-h-full max-w-full rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-700 rounded flex items-center justify-center">
                {t("carDetail.sinImagen")}
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-bold text-[#C4B5FD] mb-1">
            {vehiculo.marca} {vehiculo.modelo}
          </h1>
          <p className="text-gray-300 mb-2">
            {t("carDetail.kilometraje")}:{" "}
            <span className="text-white font-semibold">
              {vehiculo.kilometraje} km
            </span>
          </p>

          <p className="text-sm text-gray-400 mb-1">{t("carDetail.caracteristicas")}:</p>
          <ul className="text-sm text-gray-200 list-disc list-inside mb-6">
            {/* {vehiculo.caracteristicas?.map((item, index) => (
              <li key={index}>{item}</li>
            ))} */}
          </ul>

          <button
            className="w-full bg-[#C4B5FD] text-black hover:bg-[#a78bfa] transition-colors font-semibold py-3 rounded-md shadow-md mb-6"
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
              {calificaciones && calificaciones.length > 0 ? (
                calificaciones.slice(0, 4).map((rev, i) => (
                  <div
                    key={i}
                    className="bg-[rgba(31,41,55,0.6)] p-4 rounded-lg shadow-md"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <img
                        src={rev.avatar}
                        alt={rev.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-white">{rev.username}</p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`w-4 h-4 ${j < rev.calificacion
                                ? "fill-[#fbff0e] text-[#C4B5FD]"
                                : "fill-gray-600 text-[#C4B5FD]"
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 italic truncate">
                      "{rev.contenido}"
                    </p>
                  </div>
                ))
              ) : (
                null
              )}
            </div>
          </>
        )}
      </div>


      {/* BOTÓN TOGGLE */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="text-sm font-medium text-[#C4B5FD] hover:underline"
        >
          {showAllReviews
            ? t("carDetail.ocultarTodas")
            : t("carDetail.verTodas")}
        </button>
      </div>

      {/* SECCIÓN TODAS LAS RESEÑAS */}
      {showAllReviews && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#C4B5FD] mb-6 text-center">
            {t("carDetail.tituloTodasReseñas")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calificaciones && calificaciones.length > 0 ? (
              calificaciones.map((rev, i) => (
                <div
                  key={i}
                  className="bg-[rgba(31,41,55,0.6)] p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <img
                      src={rev.avatar}
                      alt={rev.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{rev.username}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${j < rev.calificacion
                              ? "fill-[#fbff0e] text-[#C4B5FD]"
                              : "fill-gray-600 text-[#C4B5FD]"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic truncate">
                    "{rev.contenido}"
                  </p>
                </div>
              ))
            ) : (
              null
            )}
          </div>
        </div>
      )}


      {/* VEHÍCULOS PROMO */}
      <div className="mt-20">
        <CochesPromoComponent />
      </div>

      {/* POPUP DE PAGO */}
      {
        showPaymentPopup && (

          <ModalPaymentComponent onClose={() => setShowPaymentPopup(false)} vehicle={vehiculo} onSubmit={peticionPago} />
        )
      }
    </div >
  );
};
