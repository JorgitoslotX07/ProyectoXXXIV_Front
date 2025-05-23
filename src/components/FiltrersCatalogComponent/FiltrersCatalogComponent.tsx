import type { FC } from "react";
import { GeneredFilterComponent } from "../GeneredFilterComponent/GeneredFilterComponent";
import type { FiltrersCatalog } from "../../interfaces/FiltrersCatalogProps";
import type { FilterCategory, FilterOption } from "../../interfaces/GeneredFilterComponentProp";
import type { Vehiculo } from "../../interfaces/Vehiculo";

export const FiltrersCatalogComponent: FC<FiltrersCatalog> = ({onFilterChange, vehiculos}) => {
  //  const filters: FilterCategory[] = [
  //   {
  //     label: "Ordenar por",
  //     name: "sort",
  //     options: [
  //       { label: "Más recientes", value: "nuevos" },
  //       { label: "Precio: de bajo a alto", value: "precio_asc" },
  //       { label: "Precio: de alto a bajo", value: "precio_desc" },
  //       { label: "Más popular", value: "popular" },
  //       { label: "Autonomía: de mayor a menor", value: "autonomia_desc" },
  //     ],
  //   },
  //   {
  //     label: "Tipo de Vehículo",
  //     name: "tipo",
  //     options: [
  //       { label: "Turismo", value: "TURISMO" },
  //       { label: "SUV", value: "SUV" },
  //       { label: "Monovolumen", value: "MONOVOLUMEN" },
  //       { label: "Minicoche", value: "MINICOCHE" },
  //       { label: "Furgoneta", value: "FURGONETA" },
  //     ],
  //   },
  //   {
  //     label: "Puertas",
  //     name: "puertas",
  //     options: [
  //       { label: "Tres puertas", value: "TRES" },
  //       { label: "Cuatro puertas", value: "CUATRO" },
  //       { label: "Cinco puertas", value: "CINCO" },
  //     ],
  //   },
  //   {
  //     label: "Tipo de Energía",
  //     name: "combustible",
  //     options: [
  //       { label: "Gasolina", value: "GASOLINA" },
  //       { label: "Diésel", value: "DIESEL" },
  //       { label: "Eléctrico", value: "ELECTRICO" },
  //       { label: "Híbrido", value: "HIBRIDO" },
  //     ],
  //   },
  //   {
  //     label: "Marca",
  //     name: "marca",
  //     options: [
  //       { label: "Toyota", value: "Toyota" },
  //       { label: "Ford", value: "Ford" },
  //       { label: "BMW", value: "BMW" },
  //       { label: "Tesla", value: "Tesla" },
  //       { label: "Mercedes", value: "Mercedes" },
  //       { label: "Audi", value: "Audi" },
  //       { label: "Kia", value: "Kia" },
  //       { label: "Seat", value: "Seat" },
  //       { label: "Volkswagen", value: "Volkswagen" },
  //     ],
  //   },
  //   {
  //     label: "Accesibilidad",
  //     name: "accesible",
  //     options: [
  //       { label: "Vehículos accesibles", value: "true" },
  //       { label: "No accesibles", value: "false" },
  //     ],
  //   },
  //   {
  //     label: "Estado del Vehículo",
  //     name: "estado",
  //     options: [
  //       { label: "Disponible", value: "DISPONIBLE" },
  //       { label: "En uso", value: "EN_USO" },
  //       { label: "En mantenimiento", value: "EN_MANTENIMIENTO" },
  //     ],
  //   },
  // ];
  

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
            <GeneredFilterComponent key={index} index={index} filter={filter} onFilterChange={onFilterChange}/>
          ))}
        </div>
      </div>
    </>
  );
};
