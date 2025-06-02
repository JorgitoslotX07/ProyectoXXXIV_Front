import { type FC } from "react";
import { CardcocheComponent } from "../CardProductComponent/CardProductComponent";
import type { ProductosCatalogProps } from "../../interfaces/ProductosCatalogProps";

export const ProductosCatalogComponent: FC<ProductosCatalogProps> = ({
  vehiculos,
  modoClaro,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4 px-4">
        <p className={`text-sm font-semibold ${modoClaro ? "text-gray-800" : "text-gray-300"}`}>
          {vehiculos.totalElements} Products
        </p>
        <p
          className={`text-sm cursor-pointer transition underline-offset-2 hover:underline ${
            modoClaro ? "text-gray-600 hover:text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Cambiar vista
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        {vehiculos.content.map((product, index) => (
          <CardcocheComponent coche={product} index={index} key={index} />
        ))}
      </div>
    </>
  );
};
