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
      {/* <div className="flex flex-col w-44">
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
      </div> */}
      <div className="flex flex-col w-44">
        <label
          htmlFor={`filter-${index}`}
          className="text-sm font-medium text-gray-300 mb-1"
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
          className="text-sm text-white"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: "#1F2937",
              borderColor: state.isFocused ? "#A78BFA" : "#374151",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#A78BFA",
              },
              color: "white",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1F2937",
              color: "white",
              zIndex: 50,

              scrollbarWidth: "thin",
              scrollbarColor: "#A78BFA transparent",

              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#A78BFA",
                borderRadius: "4px",
              },
            }),
            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isSelected
                ? "#A78BFA"
                : isFocused
                  ? "#374151"
                  : "#1F2937",
              color: "white",
              cursor: "pointer",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#9CA3AF",
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: "#9CA3AF",
              "&:hover": {
                color: "#A78BFA",
              },
            }),
            clearIndicator: (base) => ({
              ...base,
              color: "#9CA3AF",
              "&:hover": {
                color: "#A78BFA",
              },
            }),
          }}
        />
      </div>

    </>
  );
};
