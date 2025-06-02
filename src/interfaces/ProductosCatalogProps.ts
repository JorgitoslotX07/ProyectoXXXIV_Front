
import type { Vehiculo } from "./Vehiculo";

export interface ProductosCatalogProps {
  vehiculos: {
    totalElements: number;
    content: Vehiculo[];
  };
  modoClaro: boolean;
}
