import type { PageProps } from "./PageProps";
import type { FiltroVehiculo, Vehiculo } from "./Vehiculo";

export interface FiltrersCatalog {
    onFilterChange: (clave: FiltroVehiculo, valor: string | number | boolean) => void;
    vehiculos: PageProps<Vehiculo>;
}