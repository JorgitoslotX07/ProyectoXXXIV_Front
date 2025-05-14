import type { FC } from "react";
import type { GeneredFilterComponentProp } from "../../interfaces/GeneredFilterComponentProp";

export const GeneredFilterComponent: FC<GeneredFilterComponentProp> = ({index, filter}) => {   
   

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
            >
                {filter.options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
                ))}
            </select>
        </div>
                
    </>
  );
};
