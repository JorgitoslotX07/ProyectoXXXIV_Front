import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { CardcocheComponent } from "../CardProductComponent/CardProductComponent";
import type { ProductosCatalogProps } from "../../interfaces/ProductosCatalogProps";

export const ProductosCatalogComponent: FC<ProductosCatalogProps> = ({
  vehiculos,
  modoClaro,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between items-center mb-4 px-4">
        <p className={`text-sm font-semibold ${modoClaro ? "text-gray-700" : "text-gray-300"}`}>
          {vehiculos.totalElements} {t("catalog.products")}
        </p>
        <p
          className={`text-sm cursor-pointer transition hover:underline ${
            modoClaro ? "text-gray-500 hover:text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          {t("catalog.changeView")}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        {vehiculos.content.map((product, index) => (
          <CardcocheComponent key={index} coche={product} index={index} />
        ))}
      </div>
    </>
  );
};
