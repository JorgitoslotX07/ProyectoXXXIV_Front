import { useState, useEffect, type FC } from "react";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";
import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet } from "../../utils/apiService";

export const CarDetailPage: FC = () => {
  const location = useLocation();
  const { state } = location;
  const product: number = state;
  // console.log(product);

  const [vehiculo, setVehiculo] = useState<Vehiculo>(Vehiculo);

  useEffect(() => {
    const fetch = async () => {
      console.log(product);
      const data = await httpGet<Vehiculo>("/vehiculos/" + product);
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
            {/* <div className="bg-gray-100 aspect-square flex items-center justify-center mb-4">
              <img
                src={vehiculo.imagen}
                alt="Product"
                className="object-contain max-h-full max-w-full"
              />
            </div> */}

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

          <div className="w-full ">
            <h1 className="text-2xl font-semibold mb-2">{vehiculo.marca}</h1>
            <p className="text-sm text-gray-500 mb-4">{vehiculo.modelo}</p>

            <div className="flex items-baseline gap-2 mb-6">
              <p className="text-xl font-bold text-gray-900">
                Precio:
                {/* {vehiculo.} */}€
              </p>
            </div>

            <p className="text-sm text-gray-600 mb-1">Características:</p>
            <ul className="text-sm text-gray-700 space-y-1 leading-tight mb-6">
              {/* {vehiculo.caracteristicas.map((item: string, index:number) => (
                <li key={index} className="flex items-start gap-2">
                  ✓ {item}
                </li>
              ))} */}
            </ul>

            <button className="w-full bg-gray-800 text-white py-3 rounded font-semibold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor">
                <path d="..." />
              </svg>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y border-t border-gray-200 text-sm text-gray-900 mt-8">
        <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
          <span className="font-semibold">Product Details</span>
          <ChevronRight className="w-4 h-4" />
        </div>

        <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
          <span className="font-semibold">Size & Measurements</span>
          <ChevronRight className="w-4 h-4" />
        </div>

        <div className="flex flex-col px-4 py-3 cursor-pointer hover:bg-gray-50 gap-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Reviews</span>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="flex items-center text-gray-700 text-xs gap-1 mt-1">
            {/* {product.reviews.from({ length: 5 }).map((rev, i) => (
                        <Star
                        key={i}
                        className={`w-4 h-4 ${
                            i < rev ? "fill-black text-black" : "fill-gray-300 text-gray-300"
                        }`}
                        />
                    ))} */}
            {/* {product.reviews.map((rev, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.valoracion
                          ? "fill-black text-black"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({rev.valoracion}/5)
                  </span>
                </div>
                <p className="text-sm text-gray-800 italic">
                  "{rev.comentario}"
                </p>
              </div>
            ))} */}
            {/* <span className="ml-1 text-gray-500">(12)</span> */}
          </div>
        </div>
      </div>

      <div className="mt-20 px-10">
        <CochesPromoComponent />
      </div>
    </>
  );
};
