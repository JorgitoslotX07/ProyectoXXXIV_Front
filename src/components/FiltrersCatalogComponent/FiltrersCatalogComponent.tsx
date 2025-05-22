import type { FC } from "react";
import { GeneredFilterComponent } from "../GeneredFilterComponent/GeneredFilterComponent";

export const FiltrersCatalogComponent: FC = () => {
  const filters = [
    {
      label: "Ordenar Por",
      options: [
        "Nuevos",
        "Precio: De bajo a alto",
        "Precio: De alto a bajo",
        "Más Popular",
      ],
    },
    {
      label: "Categoria",
      options: ["Turismo", "SUV", "Monovolumen", "Minicoche"],
    },
    {
      label: "Tiempo de Combustible",
      options: ["Gasolina", "Diesel", "Electrico", "Hibrido"],
    },
    {
      label: "Marca",
      options: ["Toyota", "Ford", "BMW", "Tesla", "Mercedes", "Audi"],
    },
  ];

  return (
    <>
      <div className="p-6 space-y-6">
        {/* <h3 className="text-2xl font-semibold mb-4">
          Categorias | Tipo de Coche
        </h3> */}

        <div className="flex flex-wrap gap-4">
          {filters.map((filter, index) => (
            <GeneredFilterComponent key={index} index={index} filter={filter} />
          ))}
        </div>
      </div>
    </>
  );
};
