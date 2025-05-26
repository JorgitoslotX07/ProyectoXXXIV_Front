import type { FC } from "react";
import type { PaginacionProps } from "../../interfaces/PaginacionProps";

export const PaginacionComponent: FC<PaginacionProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageSizes = [5, 10, 20, 34, 50, 100];

  return (
    // <div className="flex items-center justify-between mt-4 space-x-4">
    //   <div className="flex items-center space-x-2">
    //     <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
    //       Mostrar:
    //     </label>
    //     <select
    //       id="pageSize"
    //       value={pageSize}
    //       onChange={(e) => onPageSizeChange(Number(e.target.value))}
    //       className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm"
    //     >
    //       {pageSizes.map((size) => (
    //         <option key={size} value={size}>
    //           {size}
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <div className="flex items-center space-x-2">
    //     <button
    //       onClick={() => onPageChange(currentPage - 1)}
    //       disabled={currentPage === 0}
    //       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    //     >
    //       Anterior
    //     </button>
    //     <span className="text-sm">
    //       Página {currentPage + 1} de {totalPages}
    //     </span>
    //     <button
    //       onClick={() => onPageChange(currentPage + 1)}
    //       disabled={currentPage + 1 >= totalPages}
    //       className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    //     >
    //       Siguiente
    //     </button>
    //   </div>
    // </div>

    <div className="flex items-center justify-between mt-4 space-x-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="pageSize" className="text-sm font-medium text-gray-300">
          Mostrar:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="cursor-pointer px-2 py-1 border border-gray-600 rounded-md bg-[#1F2937] text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {pageSizes.map((size) => (
            <option
              key={size}
              value={size}
              className="bg-[#1F2937] text-gray-300"
            >
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 bg-[#374151] text-gray-300 rounded hover:bg-[#4B5563] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-300">
          Página {currentPage + 1} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
          className="px-3 py-1 bg-[#374151] text-gray-300 rounded hover:bg-[#4B5563] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
