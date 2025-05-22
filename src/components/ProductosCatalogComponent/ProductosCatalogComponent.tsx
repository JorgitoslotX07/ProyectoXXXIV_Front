import { useEffect, useState, type FC } from "react";
import { Link } from "react-router-dom";
import { httpGet } from "../../utils/apiService";
import type { Vehiculo } from "../../interfaces/Vehiculo";
import { CardcocheComponent } from "../CardProductComponent/CardProductComponent";
import { PageVehiculos, type PageProps } from "../../interfaces/PageProps";

export const ProductosCatalogComponent: FC = () => {
  const [vehiculos, setVehiculos] =
    useState<PageProps<Vehiculo>>(PageVehiculos);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGet<PageProps<Vehiculo>>("/vehiculos");
      if (data) {
        setVehiculos(data);
        console.log(data);
      }
    };

    fetch();
  }, []);

  // function filtrarVehiculosPorClave(
  //   clave: FiltroVehiculo,
  //   valor: string | boolean | number
  // ) {
  //   switch (clave) {
  //     case "marca":
  //       vehiculos.content.filter((v) =>
  //         v.marca.toLowerCase().includes((valor as string).toLowerCase())
  //       );
  //       break;
  //     case "modelo":
  //       vehiculos.content.filter((v) =>
  //         v.modelo.toLowerCase().includes((valor as string).toLowerCase())
  //       );
  //       break;
  //     case "estado":
  //       vehiculos.content.filter(
  //         (v) => v.estado.toLowerCase() === (valor as string).toLowerCase()
  //       );
  //       break;
  //     case "localidad":
  //       vehiculos.content.filter((v) =>
  //         v.localidad.toLowerCase().includes((valor as string).toLowerCase())
  //       );
  //       break;
  //     case "esAccesible":
  //       vehiculos.content.filter((v) => v.esAccesible === valor);
  //       break;
  //     case "autonomiaMin":
  //       vehiculos.content.filter((v) => v.autonomia >= (valor as number));
  //       break;
  //     case "autonomiaMax":
  //       vehiculos.content.filter((v) => v.autonomia <= (valor as number));
  //       break;
  //     default:
  //       break;
  //     // setVehiculos vehiculos.content;
  //   }
  // }

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-800 font-medium">
          {vehiculos.totalElements} Products
        </p>
        <p className="text-sm text-gray-700 hover:underline cursor-pointer">
          Cambiar vista
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {vehiculos.content.map((product, index) => (
          // product.estado == "DISPONIBLE" && (
          <Link to="/catalog/carDetail" state={product}>
            <CardcocheComponent
              coche={product}
              index={index}
              // filtrarVehiculosPorClave={filtrarVehiculosPorClave}
            />
          </Link>
          // )
        ))}
      </div>
    </>
  );
};
