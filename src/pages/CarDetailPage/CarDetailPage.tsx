import { useState, useEffect, type FC } from "react";
import { useLocation } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet } from "../../utils/apiService";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";

export const CarDetailPage: FC = () => {
  const location = useLocation();
  const { state } = location;
  const carId: number = state;
  // console.log(product);

  const [vehiculo, setVehiculo] = useState<Vehiculo>(Vehiculo);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [calificaciones, setCalificaciones] = useState([
    {
      usuario: "María G.",
      avatar: "/vite.svg",
      valoracion: 4,
      comentario: "Muy buen coche, limpio y cómodo. Lo volvería a usar."
    },
    {
      usuario: "Luis P.",
      avatar: "/vite.svg",
      valoracion: 5,
      comentario: "Perfecto para moverse por la ciudad, excelente autonomía."
    }
  ]);

  useEffect(() => {
    const fetch = async () => {
      console.log(carId);
      const data = await httpGet<Vehiculo>("/vehiculos/" + carId);
      if (data) {
        setVehiculo(data);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {/* <div className="flex flex-col  items-start gap-12 mt-20 px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
            <div>
                <div className="bg-gray-100 aspect-square flex items-center justify-center mb-4">
                    <img src={product.imageUrl} alt="Product" className="object-contain h-full" />
                </div>

                
                <div className="flex gap-2">
                <button className="border p-1">
                    <img src="/path-to-thumb.jpg" alt="Thumbnail 1" className="w-12 h-12 object-cover" />
                </button>
                <button className="border p-1 opacity-50">
                    <img src="/path-to-thumb2.jpg" alt="Thumbnail 2" className="w-12 h-12 object-cover" />
                </button>
                </div>
            </div>
            <div>
                <h1 className="text-xl font-semibold">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-2">{product.description}</p>

        
                <div className="flex items-baseline gap-2 mt-6">
                    <p className="text-xl font-bold text-gray-900">Precio: {product.price} €</p>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                    Caracteristicas:
                </p>

                <ul className="text-sm text-gray-700 space-y-1 leading-tight">

                {product.caracteristicas.map((item: string, index) => (
                    <li key={index} className="flex items-start gap-2">
                        ✓ {item}
                    </li>
                ))}
                </ul>

           
                <button className="mt-17 w-full bg-gray-800 text-white py-3 rounded font-semibold flex items-center justify-center gap-2 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor"><path d="..." /></svg>
                    ADD TO CART
                </button>

                
                
              */}

      <div className="flex flex-col items-start gap-12 mt-20 px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
          <div className="w-full">
            <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded">
              {vehiculo.imagen ? (
                <img
                  src={vehiculo.imagen}
                  alt="Vehículo"
                  className="object-contain max-h-full max-w-full"
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-20 h-20 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8M4 16l4-4 4 4 4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <button className="border p-1">
                <img
                  src="/path-to-thumb.jpg"
                  alt="Thumbnail 1"
                  className="w-12 h-12 object-cover"
                />
              </button>
              <button className="border p-1 opacity-50">
                <img
                  src="/path-to-thumb2.jpg"
                  alt="Thumbnail 2"
                  className="w-12 h-12 object-cover"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-bold text-[#C4B5FD] mb-1">{vehiculo.marca} {vehiculo.modelo}</h1>
          <p className="text-gray-300 mb-2">Kilometraje: <span className="text-white font-semibold">{vehiculo.kilometraje} km</span></p>

          <p className="text-sm text-gray-400 mb-1">Características:</p>
          <ul className="text-sm text-gray-200 list-disc list-inside mb-6">
            {vehiculo.caracteristicas?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <button
            className="w-full bg-[#C4B5FD] text-black hover:bg-[#a78bfa] transition-colors font-semibold py-3 rounded-md shadow-md mb-6"
            onClick={() => setShowPaymentPopup(true)}
          >
            Reservar vehículo
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Calificaciones</h2>
        <div className="grid gap-4">
          {calificaciones.map((rev, i) => (
            <div key={i} className="bg-[rgba(31,41,55,0.6)] p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-2">
                <img src={rev.avatar} alt={rev.usuario} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-white">{rev.usuario}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${j < rev.valoracion ? "fill-[#C4B5FD] text-[#C4B5FD]" : "fill-gray-600 text-gray-600"}`}
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

      <div className="mt-20">
        {/* <h2 className="text-xl font-semibold text-[#C4B5FD] mb-6">Vehículos recomendados</h2> */}
        <CochesPromoComponent />
      </div>

      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#fff9c9] rounded-xl p-6 text-black w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirmar reserva</h3>
            <p className="mb-4">¿Deseas proceder con el pago para reservar el {vehiculo.marca} {vehiculo.modelo}?</p>
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
