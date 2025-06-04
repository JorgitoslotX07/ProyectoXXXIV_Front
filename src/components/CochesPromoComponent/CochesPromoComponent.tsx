import { useState, useEffect, type FC } from "react";
// import { Link } from "react-router-dom";
import { Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet } from "../../utils/apiService";
import { createEmptyPage, type PageProps } from "../../interfaces/PageProps";
import { useTranslation } from "react-i18next";
import { CardcocheComponent } from "../CardProductComponent/CardProductComponent";

interface Props {
  modoClaro: boolean;
}

export const CochesPromoComponent: FC<Props> = ({ modoClaro }) => {
  const { t } = useTranslation();

  const [vehiculos, setVehiculos] = useState<PageProps<Vehiculo>>(
    createEmptyPage<Vehiculo>()
  );

  const size: number = 4;
  const peticionVehiculos = async () => {
    const response = await httpGet<PageProps<Vehiculo>>(
      `/vehiculos?page=0&size=${size}`
    );
    if (response) {
      setVehiculos(response);
    }
  };

  useEffect(() => {
    peticionVehiculos();
  }, []);

  return (
    <>
      {/* <div className="px-4">
        <h2 className="text-2xl font-semibold mb-4">Coches Populares</h2>
  
        <div className="flex flex-wrap justify-center gap-6">
        {products.map((product, index) => (
          <Link to="/catalog/carDetail" state={product}>
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="h-32 bg-gray-200 mb-4 rounded flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover h-full w-full"

              />
            </div>
            
            <h3 className="font-semibold text-sm">{product.name}</h3>
            <p className="text-xs text-gray-500">{product.description}</p>
            
            <p className="mt-2 font-bold">{product.price} €</p>
          </div>
          </Link>
        ))}
        </div>
    </div> */}

      <div className="px-4 py-10">
        <h2
          className="text-2xl font-semibold mb-6"
          style={{
            color: modoClaro ? "#FFD700" : "#C4B5FD",
            // textShadow: modoClaro
            //   ? "1px 1px 4px rgba(0,0,0,0.4)"
            //   : "1px 1px 4px rgba(196, 181, 253, 0.4)",
          }}
        >
          {t("promo.title")}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {vehiculos.content.map((product, index) => (
            // <Link to="/catalog/carDetail" state={product} key={index}>
            //   <div
            //     className="p-4 rounded-lg shadow-lg transition-shadow duration-300 w-64"
            //     style={{ backgroundColor: "#1F2937" }}
            //   >
            //     <div
            //       className="h-40 mb-4 rounded overflow-hidden flex items-center justify-center"
            //       style={{ backgroundColor: "#374151" }}
            //     >
            //       {product.imagen && (
            //         <img
            //           src={product.imagen}
            //           alt={product.modelo}
            //           className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
            //         />
            //       )}
            //     </div>

            //     <h3
            //       className="font-semibold text-base"
            //       style={{ color: "#FBCFE8" }}
            //     >
            //       {product.marca} {product.modelo}
            //     </h3>
            //     <p className="text-sm text-gray-300 line-clamp-2">
            //       Autonomia: {product.autonomia}
            //     </p>
            //   </div>
            // </Link>

            <CardcocheComponent coche={product} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};
