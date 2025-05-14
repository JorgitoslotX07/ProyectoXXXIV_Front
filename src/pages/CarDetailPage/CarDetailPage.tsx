import type { FC } from "react";
import {CochesPromoComponent} from '../../components/CochesPromoComponent/CochesPromoComponent';
import type { ProductoProps } from "../../interfaces/ProductoProps";
import { useLocation } from "react-router-dom";

export const CarDetailPage: FC = () => {
    const location = useLocation();
    const { state } = location;
    const product: ProductoProps = state;
    console.log(product);

  return (
    <>
    <div className="flex flex-col  items-start gap-12 mt-20 px-10">
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

            
                    <div className="flex items-baseline gap-2">
                        <p className="text-xl font-bold text-gray-900">{product.price} €</p>
                        {/* <p className="line-through text-gray-400">$119</p> */}
                        {/* <p className="text-sm text-red-500">-20%</p> */}
                    </div>

                        {/* CALIFICACIONES */}
                        {/* <div className="flex items-center text-sm text-gray-600 mb-4">
                        ★★★★☆ <span className="ml-2 text-xs">(12)</span>
                        </div> */}

                    {/* COMPRAR */}
                    <button className="w-full bg-gray-800 text-white py-3 rounded font-semibold flex items-center justify-center gap-2 mb-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor"><path d="..." /></svg>
                        ADD TO CART
                    </button>

                    
                    <p className="text-sm text-gray-600 mb-4">
                        Caracteristicas:
                    </p>

                    <ul className="text-sm text-gray-700 space-y-1 leading-tight">

                    {product.caracteristicas.map((item: string, index) => (
                        <li key={index} className="flex items-start gap-2">
                           ✓ {item}
                        </li>
                    ))}
                    </ul>
                </div>
                </div>

            </div>
        


      <div className="mt-20 px-10">
        <CochesPromoComponent />
      </div>
    </>
  );
};
