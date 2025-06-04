import type { FC } from "react";
import type { PaginacionProps } from "../../interfaces/PaginacionProps";
import { useTranslation } from "react-i18next";

interface Props extends PaginacionProps {
  modoClaro: boolean;
}

export const PaginacionComponent: FC<Props> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  modoClaro,
}) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageSizes = [5, 10, 20, 34, 50, 100];

  return (
    <div className="flex items-center justify-between mt-4 space-x-4">
      <div className="flex items-center space-x-2">
        <label
          htmlFor="pageSize"
          className={`text-sm font-medium ${modoClaro ? "text-gray-700" : "text-gray-300"}`}
        >
          {t("pagination.show")}:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className={`cursor-pointer px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${modoClaro
              ? "border-gray-300 bg-white text-gray-800"
              : "border-gray-600 bg-[#1F2937] text-gray-300"}`}
        >
          {pageSizes.map((size) => (
            <option
              key={size}
              value={size}
              className={modoClaro ? "bg-white text-gray-800" : "bg-[#1F2937] text-gray-300"}
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
          className={`px-3 py-1 rounded transition disabled:opacity-50 disabled:cursor-not-allowed
            ${modoClaro
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-[#374151] text-gray-300 hover:bg-[#4B5563]"}`}
        >
          {t("pagination.previous")}
        </button>
        <span className={`text-sm ${modoClaro ? "text-gray-800" : "text-gray-300"}`}>
          {t("pagination.page")} {currentPage + 1} {t("pagination.of")} {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
          className={`px-3 py-1 rounded transition disabled:opacity-50 disabled:cursor-not-allowed
            ${modoClaro
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-[#374151] text-gray-300 hover:bg-[#4B5563]"}`}
        >
          {t("pagination.next")}
        </button>
      </div>
    </div>
  );
};
