import { useState, useEffect, type FC } from "react";
import { useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import { Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet } from "../../utils/apiService";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";

export const CarDetailPage: FC = () => {
  const location = useLocation();
  const { state } = location;
  const product: number = state;

  const [vehiculo, setVehiculo] = useState<Vehiculo>(Vehiculo);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [calificaciones] = useState([
    {
      usuario: "María G.",
      avatar: "/vite.svg",
      valoracion: 4,
      comentario: "Muy buen coche, limpio y cómodo. Lo volvería a usar.",
    },
    {
      usuario: "Luis P.",
      avatar: "/vite.svg",
      valoracion: 5,
      comentario: "Perfecto para moverse por la ciudad, excelente autonomía.",
    },
    {
      usuario: "Claudia R.",
      avatar: "/vite.svg",
      valoracion: 5,
      comentario: "Cómodo, eficiente y limpio. ¡Todo perfecto!",
    },
    {
      usuario: "Iván T.",
      avatar: "/vite.svg",
      valoracion: 4,
      comentario: "Me gustó mucho, aunque el GPS tardó un poco en actualizarse.",
    },
    {
      usuario: "Laura M.",
      avatar: "/vite.svg",
      valoracion: 5,
      comentario: "Experiencia excelente, muy fácil de reservar y usar.",
    },
    {
      usuario: "Carlos D.",
      avatar: "/vite.svg",
      valoracion: 3,
      comentario: "Todo bien, pero el coche tenía poca batería al inicio.",
    },
    {
      usuario: "Ana B.",
      avatar: "/vite.svg",
      valoracion: 4,
      comentario: "Cómodo para trayectos cortos. Volveré a usarlo.",
    },
    {
      usuario: "Jorge L.",
      avatar: "/vite.svg",
      valoracion: 5,
      comentario: "Muy recomendable, impecable y eficiente.",
    },
    {
      usuario: "Elena F.",
      avatar: "/vite.svg",
      valoracion: 4,
      comentario: "Buena experiencia, aunque el aire acondicionado no funcionaba bien.",
    }

  ]);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<Vehiculo>("/vehiculos/" + product);
      if (data) setVehiculo(data);
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
                Sin imagen
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-bold text-[#C4B5FD] mb-1">
            {vehiculo.marca} {vehiculo.modelo}
          </h1>
          <p className="text-gray-300 mb-2">
            Kilometraje:{" "}
            <span className="text-white font-semibold">
              {vehiculo.kilometraje} km
            </span>
          </p>

          <p className="text-sm text-gray-400 mb-1">Características:</p>
          <ul className="text-sm text-gray-200 list-disc list-inside mb-6">
            {/* {vehiculo.caracteristicas?.map((item, index) => (
              <li key={index}>{item}</li>
            ))} */}
          </ul>

          <button
            className="w-full bg-[#C4B5FD] text-black hover:bg-[#a78bfa] transition-colors font-semibold py-3 rounded-md shadow-md mb-6"
            onClick={() => setShowPaymentPopup(true)}
          >
            Reservar vehículo
          </button>
        </div>
      </div>

      {/* CALIFICACIONES */}
      <div className="mt-10">
        {!showAllReviews && (
          <>
            <h2 className="text-xl font-semibold mb-4">Reseñas destacadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {calificaciones.slice(0, 4).map((rev, i) => (
                <div
                  key={i}
                  className="bg-[rgba(31,41,55,0.6)] p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <img
                      src={rev.avatar}
                      alt={rev.usuario}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{rev.usuario}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${j < rev.valoracion
                                ? "fill-[#fbff0e] text-[#C4B5FD]"
                                : "fill-gray-600 text-[#C4B5FD]"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic truncate">
                    "{rev.comentario}"
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* BOTÓN TOGGLE */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-sm font-medium text-[#C4B5FD] hover:underline"
          >
            {showAllReviews ? "Ocultar todas las reseñas" : "Ver todas las reseñas"}
          </button>
        </div>

        {/* SECCIÓN TODAS LAS RESEÑAS */}
        {showAllReviews && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#C4B5FD] mb-6 text-center">
              Todas las reseñas de usuarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calificaciones.map((rev, i) => (
                <div
                  key={i}
                  className="bg-[rgba(31,41,55,0.6)] p-6 rounded-lg shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={rev.avatar}
                      alt={rev.usuario}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white text-lg">{rev.usuario}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-5 h-5 ${j < rev.valoracion
                                ? "fill-[#fbff0e] text-[#C4B5FD]"
                                : "fill-gray-600 text-[#C4B5FD]"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{rev.comentario}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* VEHÍCULOS PROMO */}
      <div className="mt-20">
        <CochesPromoComponent />
      </div>

      {/* POPUP DE PAGO */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-gray/60 backdrop-blur-sm flex items-center justify-center z-50">
<div className="bg-[rgb(50,165,111)] backdrop-blur-[16px] backdrop-saturate-[200%] rounded-xl border border-[rgba(84,186,76,0.13)] p-6 text-black w-full max-w-md">            <h3 className="text-xl font-bold mb-4">Confirmar reserva</h3>
            <p className="mb-4">
              ¿Deseas proceder con el pago para reservar el {vehiculo.marca}{" "}
              {vehiculo.modelo}?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPaymentPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowPaymentPopup(false);
                  alert("Reserva confirmada 🚗✅");
                }}
                className="px-4 py-2 bg-[#C4B5FD] text-black font-semibold rounded hover:bg-[#a78bfa]"
              >
                Pagar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
