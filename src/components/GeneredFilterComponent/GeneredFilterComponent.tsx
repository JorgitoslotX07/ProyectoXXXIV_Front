import type { FC } from "react";
import type { FiltersProps } from "../../interfaces/GeneredFilterComponentProp";
import Select, { components } from "react-select";
import type { FiltroVehiculo } from "../../interfaces/Vehiculo";

export const GeneredFilterComponent: FC<FiltersProps> = ({
  index,
  filter,
  onFilterChange,
  valorActual,
}) => {
  // Componente personalizado para mostrar logo + label
  const CustomOption = (props: T) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 cursor-pointer text-white"
      >
        {data.logo && (
          <img
            src={data.logo}
            alt={data.label}
            className="w-5 h-5 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/logosMarca/default.svg";
            }}
          />
        )}
        <span>{data.label}</span>
      </div>
    );
  };

  const CustomSingleValue = (props: T) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div className="flex items-center gap-2">
          {data.logo && (
            <img
              src={data.logo}
              alt={data.label}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logosMarca/default.svg";
              }}
            />
          )}
          <span>{data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

  return (
    <div className="flex flex-col w-48 gap-1">
      <label
        htmlFor={`filter-${index}`}
        className="text-xs font-semibold text-gray-400 tracking-wide px-1"
      >
        {filter.label}
      </label>

      <Select
        inputId={`filter-${index}`}
        options={filter.options}
        value={
          valorActual
            ? filter.options.find((opt) => opt.value === valorActual)
            : null
        }
        onChange={(selected) =>
          onFilterChange(filter.name as FiltroVehiculo, selected?.value ?? "")
        }
        isClearable
        placeholder={`Selecciona ${filter.label.toLowerCase()}`}
        className="text-sm text-white"
        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "#111827",
            borderColor: state.isFocused ? "#8B5CF6" : "#374151",
            borderWidth: "1px",
            boxShadow: state.isFocused ? "0 0 0 1px #8B5CF6" : "none",
            "&:hover": {
              borderColor: "#8B5CF6",
            },
            borderRadius: "0.5rem",
            color: "white",
            minHeight: "38px",
          }),
          singleValue: (base) => ({
            ...base,
            color: "white",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#1F2937",
            borderRadius: "0.5rem",
            marginTop: 4,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
            zIndex: 50,
            paddingTop: 4,
            paddingBottom: 4,
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected
              ? "#8B5CF6"
              : isFocused
              ? "#4B5563"
              : "transparent",
            color: isSelected ? "#fff" : "#E5E7EB",
            cursor: "pointer",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 12,
            paddingRight: 12,
            transition: "background 0.2s ease-in-out",
            borderRadius: "0.375rem",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9CA3AF",
          }),
          dropdownIndicator: (base, { isFocused }) => ({
            ...base,
            color: isFocused ? "#8B5CF6" : "#9CA3AF",
            transition: "color 0.2s",
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
  );
};
