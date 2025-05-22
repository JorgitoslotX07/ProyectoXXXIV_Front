import { useEffect, useState, type FC } from "react";
import { Link } from "react-router-dom";
import { httpGet } from "../../utils/apiService";
import type { Vehiculo } from "../../interfaces/Vehiculo";
import { CardcocheComponent } from "../CardProductComponent/CardProductComponent";

export const ProductosCatalogComponent: FC = () => {
  const [products, setProducts] = useState<Vehiculo[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<Vehiculo[]>("/vehiculos");
      if (data) {
        setProducts(data);
        console.log(data);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-800 font-medium">
          {products.length} Products
        </p>
        <p className="text-sm text-gray-700 hover:underline cursor-pointer">
          Cambiar vista
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product, index) => (
          // product.estado == "DISPONIBLE" && (
          <Link to="/catalog/carDetail" state={product}>
            <CardcocheComponent coche={product} index={index} />
          </Link>
          // )
        ))}
      </div>
    </>
  );
};
