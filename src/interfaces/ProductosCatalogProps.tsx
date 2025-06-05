import type { ModoClaroProps } from "./ModoClaroProps";
import type { PageProps } from "./PageProps";
import type { Vehiculo } from "./Vehiculo";

export interface ProductosCatalogProps extends ModoClaroProps {
    vehiculos: PageProps<Vehiculo>;
}