import type { FC } from "react";
import type {
  FiltersProps,
  OptionType,
} from "../../interfaces/GeneredFilterComponentProp";
import Select, {
  components,
  type OptionProps,
  type SingleValueProps,
} from "react-select";
import type { FiltroVehiculo } from "../../interfaces/Vehiculo";

// Añadimos modoClaro a las props
interface ExtendedFiltersProps extends FiltersProps {
  modoClaro: boolean;
}

export const GeneredFilterComponent: FC<ExtendedFiltersProps> = ({
  index,
  filter,
  onFilterChange,
  valorActual,
  modoClaro,
}) => {
  const CustomOption = (props: OptionProps<OptionType, false>) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${
          modoClaro ? "hover:bg-gray-200 text-black" : "hover:bg-gray-700 text-white"
        }`}
      >
        {data.logo && (
          <img
            src={data.logo}
            alt={data.label}
            className={`w-5 h-5 object-contain ${modoClaro ? "invert-0" : "invert"}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/logosMarca/default.svg";
            }}
          />
        )}
        <span>{data.label}</span>
      </div>
    );
  };

  const CustomSingleValue = (props: SingleValueProps<OptionType, false>) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div className="flex items-center gap-2">
          {data.logo && (
            <img
              src={data.logo}
              alt={data.label}
              className={`w-5 h-5 object-contain ${modoClaro ? "invert-0" : "invert"}`}
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
        className={`text-xs font-semibold tracking-wide px-1 ${
          modoClaro ? "text-gray-700" : "text-gray-400"
        }`}
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
        className={`text-sm ${modoClaro ? "text-black" : "text-white"}`}
        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: modoClaro ? "#ffffff" : "#111827",
            borderColor: state.isFocused
              ? "#8B5CF6"
              : modoClaro
              ? "#D1D5DB"
              : "#374151",
            borderWidth: "1px",
            boxShadow: state.isFocused ? "0 0 0 1px #8B5CF6" : "none",
            "&:hover": {
              borderColor: "#8B5CF6",
            },
            borderRadius: "0.5rem",
            color: modoClaro ? "#000000" : "white",
            minHeight: "38px",
          }),
          singleValue: (base) => ({
            ...base,
            color: modoClaro ? "#000" : "#fff",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: modoClaro ? "#F9FAFB" : "#1F2937",
            borderRadius: "0.5rem",
            marginTop: 4,
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            zIndex: 50,
            paddingTop: 4,
            paddingBottom: 4,
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected
              ? "#8B5CF6"
              : isFocused
              ? modoClaro
                ? "#E5E7EB"
                : "#4B5563"
              : "transparent",
            color: isSelected ? "#fff" : modoClaro ? "#111827" : "#E5E7EB",
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
            color: modoClaro ? "#6B7280" : "#9CA3AF",
          }),
          dropdownIndicator: (base, { isFocused }) => ({
            ...base,
            color: isFocused ? "#8B5CF6" : modoClaro ? "#6B7280" : "#9CA3AF",
            transition: "color 0.2s",
            "&:hover": {
              color: "#A78BFA",
            },
          }),
          clearIndicator: (base) => ({
            ...base,
            color: modoClaro ? "#6B7280" : "#9CA3AF",
            "&:hover": {
              color: "#A78BFA",
            },
          }),
        }}
      />
    </div>
  );
};
