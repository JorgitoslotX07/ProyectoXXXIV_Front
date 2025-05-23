import type { FC } from "react";
import type { FiltersProps } from "../../interfaces/GeneredFilterComponentProp";
import Select from "react-select";
import type { FiltroVehiculo } from "../../interfaces/Vehiculo";

export const GeneredFilterComponent: FC<FiltersProps> = ({
  index,
  filter,
  onFilterChange,
}) => {
  return (
    <>
      <div className="flex flex-col w-44">
        <label
          htmlFor={`filter-${index}`}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {filter.label}
        </label>
        <Select
          inputId={`filter-${index}`}
          options={filter.options}
          onChange={(selected) =>
            onFilterChange(filter.name as FiltroVehiculo, selected?.value ?? "")
          }
          isClearable
          placeholder={`${filter.label}...`}
          className="text-sm"
          styles={{
            control: (base) => ({
              ...base,
              borderColor: "#D1D5DB",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#9CA3AF",
              },
            }),
            menu: (base) => ({
              ...base,
              zIndex: 50,
            }),
          }}
        />
      </div>
    </>
  );
};
