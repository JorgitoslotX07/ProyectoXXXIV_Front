import type { FC } from "react";
import { GeneredFilterComponent } from "../GeneredFilterComponent/GeneredFilterComponent";
import type { FiltrersCatalog } from "../../interfaces/FiltrersCatalogProps";
import type {
  FilterCategory,
  FilterOption,
} from "../../interfaces/GeneredFilterComponentProp";
import type { Vehiculo } from "../../interfaces/Vehiculo";

export const FiltrersCatalogComponent: FC<FiltrersCatalog> = ({
  onFilterChange,
  vehiculos,
}) => {
  const filtrosDinamicos = (vehiculos: Vehiculo[]): FilterCategory[] => {
    return [
      {
        label: "Marca",
        name: "marca",
        options: obtenerOpcionesUnicas(vehiculos, "marca"),
      },
      {
        label: "Modelo",
        name: "modelo",
        options: obtenerOpcionesUnicas(vehiculos, "modelo"),
      },
      {
        label: "Tipo",
        name: "tipo",
        options: obtenerOpcionesUnicas(vehiculos, "tipo"),
      },
      {
        label: "Estado",
        name: "estado",
        options: obtenerOpcionesUnicas(vehiculos, "estado"),
      },
      {
        label: "Localidad",
        name: "localidad",
        options: obtenerOpcionesUnicas(vehiculos, "localidad"),
      },
      {
        label: "Accesibilidad",
        name: "esAccesible",
        options: [
          { label: "Sí", value: "true" },
          { label: "No", value: "false" },
        ],
      },
    ];
  };

  function obtenerOpcionesUnicas<T>(
    vehiculos: T[],
    campo: keyof T
  ): FilterOption[] {
    const valores = vehiculos.map((v) => String(v[campo]));
    const unicos = Array.from(new Set(valores));
    return unicos.map((valor) => ({
      label: valor,
      value: valor,
    }));
  }

  const filtros: FilterCategory[] = filtrosDinamicos(vehiculos.content);

  return (
    <>
      <div className="p-6 space-y-6">
        {/* <h3 className="text-2xl font-semibold mb-4">
          Categorias | Tipo de Coche
        </h3> */}

        <div className="flex flex-wrap gap-4">
          {filtros.map((filter, index) => (
            <GeneredFilterComponent
              key={index}
              index={index}
              filter={filter}
              onFilterChange={onFilterChange}
            />
          ))}
        </div>
      </div>
    </>
  );
};
