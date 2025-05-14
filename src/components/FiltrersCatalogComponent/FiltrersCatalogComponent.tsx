import type { FC } from "react";
import { GeneredFilterComponent } from "../GeneredFilterComponent/GeneredFilterComponent";

export const FiltrersCatalogComponent: FC = () => {   

    const filters = [
        {
          label: "Sort by",
          options: ["Newest", "Price: Low to High", "Price: High to Low", "Most Popular"],
        },
        {
          label: "Category",
          options: ["SUV", "Sedan", "Coupe", "Convertible", "Truck", "Hatchback"],
        },
        {
          label: "Color",
          options: ["Black", "White", "Red", "Blue", "Silver", "Green"],
        },
        {
          label: "Fuel Type",
          options: ["Gasoline", "Diesel", "Electric", "Hybrid", "Hydrogen"],
        },
        {
          label: "Brand",
          options: ["Toyota", "Ford", "BMW", "Tesla", "Mercedes-Benz", "Audi"],
        },
      ];
      

      

  return (
    <>
        <div className="p-6 space-y-6">

        <h3 className="text-2xl font-semibold mb-4">Categorias | Tipo de Coche</h3>


            <div className="flex flex-wrap gap-4">
            {filters.map((filter, index) => (
                <GeneredFilterComponent key={index} index={index} filter={filter} />
                ))}

            </div>
        </div>
    </>
  );
};
