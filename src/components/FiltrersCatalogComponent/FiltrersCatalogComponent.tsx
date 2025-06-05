import { useTranslation } from "react-i18next";
import type { FC } from "react";
import { GeneredFilterComponent } from "../GeneredFilterComponent/GeneredFilterComponent";
import type {
  FilterCategory,
  FilterOption,
} from "../../interfaces/GeneredFilterComponentProp";
import type { Vehiculo } from "../../interfaces/Vehiculo";

// 👇 Añadimos modoClaro al tipo de props
import type { FiltrersCatalogProps } from "../../interfaces/FiltrersCatalogProps";

interface Props extends FiltrersCatalogProps {
  modoClaro: boolean;
}

export const FiltrersCatalogComponent: FC<Props> = ({
  onFilterChange,
  vehiculos,
  vertical,
  filtros,
  modoClaro, // ✅ recibido correctamente
}) => {
  const { t } = useTranslation();

  const filtrosDinamicos = (vehiculos: Vehiculo[]): FilterCategory[] => [
    {
      label: t("catalog.filters.brand"),
      name: "marca",
      options: obtenerOpcionesUnicas(vehiculos, "marca"),
    },
    {
      label: t("catalog.filters.type"),
      name: "tipo",
      options: obtenerOpcionesUnicas(vehiculos, "tipo"),
    },
    {
      label: t("catalog.filters.location"),
      name: "localidad",
      options: obtenerOpcionesUnicas(vehiculos, "localidad"),
    },
    {
      label: t("catalog.filters.accessibility"),
      name: "esAccesible",
      options: [
        { label: t("catalog.filters.yes"), value: "true" },
        { label: t("catalog.filters.no"), value: "false" },
      ],
    },
  ];

  const filtrosDinamicosVertical = (
    vehiculos: Vehiculo[]
  ): FilterCategory[] => [
    {
      label: t("catalog.filters.location"),
      name: "localidad",
      options: obtenerOpcionesUnicas(vehiculos, "localidad"),
    },
  ];

  function obtenerOpcionesUnicas<T>(data: T[], campo: keyof T): FilterOption[] {
    const valores = data.map((v) => String(v[campo]));
    const unicos = Array.from(new Set(valores));
    return unicos.map((valor) => ({
      label: valor,
      value: valor,
      logo:
        campo === "marca"
          ? `/logosMarca/${valor.toLowerCase()}Logo.svg`
          : undefined,
    }));
  }

  const categorias: FilterCategory[] = vertical
    ? filtrosDinamicosVertical(vehiculos.content)
    : filtrosDinamicos(vehiculos.content);

  return (
    <div className="p-6 space-y-6 rounded-md">
      <div className="space-y-4">
        <div
          className={`${
            vertical
              ? "flex flex-col gap-6"
              : "flex flex-wrap gap-4 justify-between items-start"
          }`}
        >
          <div className="flex flex-wrap gap-4 flex-1">
            {categorias.map((filter, index) => (
              <GeneredFilterComponent
                key={index}
                index={index}
                filter={filter}
                onFilterChange={onFilterChange}
                valorActual={filtros[filter.name]}
                modoClaro={modoClaro} // ✅ ahora se pasa correctamente
              />
            ))}
          </div>

          {/* Botón de búsqueda, si lo necesitas descoméntalo */}
          {/* {!vertical && (
            <div className="flex justify-end w-full sm:w-auto">
              <button
                onClick={onSubmit}
                className="h-10 px-6 bg-white/80 hover:bg-white text-gray-900 text-lg font-medium rounded-full shadow transition duration-200"
              >
                {t("catalog.filters.search")}
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
