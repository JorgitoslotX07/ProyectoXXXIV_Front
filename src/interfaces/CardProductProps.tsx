import type { Vehiculo } from "./Vehiculo";

export interface CardProductProps {
  coche: Vehiculo;
  index: number;
  modoClaro?: boolean;
  // filtrarVehiculosPorClave: (
  //   clave: FiltroVehiculo,
  //   valor: string | number | boolean
  // ) => void;
}
