import type { FC } from "react";
import type { FiltersProps } from "../../interfaces/GeneredFilterComponentProp";
import type { FiltroVehiculo } from "../../interfaces/Vehiculo";

export const GeneredFilterComponent: FC<FiltersProps> = ({ index, filter, onFilterChange }) => {


    return (
        <>
            <div className="flex flex-col w-44">
                <label
                    htmlFor={`filter-${index}`}
                    className="text-sm font-medium text-gray-700 mb-1"
                >
                    {filter.label}
                </label>
                <select
                    id={`filter-${index}`}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-300 focus:border-gray-400"
                    onChange={(e) => onFilterChange(filter.name as FiltroVehiculo, e.target.value)}
                >

                    {filter.options.map((option, i) => (
                        <option key={i} value={option.value}>
                            {option.label}
                        </option>
                    ))}

                </select>
            </div>

        </>
    );
};
