import type { FC } from "react";
import { GeneredFilterComponent } from "../GeneredFilterComponent/GeneredFilterComponent";
import type {
    FilterCategory,
    FilterOption,
} from "../../interfaces/GeneredFilterComponentProp";
import type { Vehiculo } from "../../interfaces/Vehiculo";
import type { FiltrersCatalogProps } from "../../interfaces/FiltrersCatalogProps";

export const FiltrersCatalogComponent: FC<FiltrersCatalogProps> = ({
    onFilterChange,
    vehiculos,
    vertical,
    onSubmit,
}) => {
    const filtrosDinamicos = (vehiculos: Vehiculo[]): FilterCategory[] => {
        return [
            {
                label: "Marca",
                name: "marca",
                options: obtenerOpcionesUnicas(vehiculos, "marca"),
            },
            {
                label: "Modelo",
                name: "modelo",
                options: obtenerOpcionesUnicas(vehiculos, "modelo"),
            },
            {
                label: "Tipo",
                name: "tipo",
                options: obtenerOpcionesUnicas(vehiculos, "tipo"),
            },
            {
                label: "Estado",
                name: "estado",
                options: obtenerOpcionesUnicas(vehiculos, "estado"),
            },
            {
                label: "Localidad",
                name: "localidad",
                options: obtenerOpcionesUnicas(vehiculos, "localidad"),
            },
            {
                label: "Accesibilidad",
                name: "esAccesible",
                options: [
                    { label: "Sí", value: "true" },
                    { label: "No", value: "false" },
                ],
            },
        ];
    };
    const filtrosDinamicosVertical = (vehiculos: Vehiculo[]): FilterCategory[] => {
        return [
            {
                label: "Tipo",
                name: "tipo",
                options: obtenerOpcionesUnicas(vehiculos, "tipo"),
            },
            {
                label: "Estado",
                name: "estado",
                options: obtenerOpcionesUnicas(vehiculos, "estado"),
            },

            {
                label: "Localidad",
                name: "localidad",
                options: obtenerOpcionesUnicas(vehiculos, "localidad"),
            },
        ];
    };


    function obtenerOpcionesUnicas<T>(
        vehiculos: T[],
        campo: keyof T
    ): FilterOption[] {
        const valores = vehiculos.map((v) => String(v[campo]));
        const unicos = Array.from(new Set(valores));
        return unicos.map((valor) => ({
            label: valor,
            value: valor,
        }));
    }

    const filtros: FilterCategory[] = vertical ? filtrosDinamicosVertical(vehiculos.content) : filtrosDinamicos(vehiculos.content);

    return (
        <>
            <div className="p-6 space-y-6">
                <div className="p-10  space-y-6">
                    <div className={vertical ? "flex flex-col gap-6 items-start" : "flex flex-wrap gap-6 justify-center"}>

                        <div className="flex flex-wrap gap-4">
                            {filtros.map((filter, index) => (
                                <GeneredFilterComponent
                                    key={index}
                                    index={index}
                                    filter={filter}
                                    onFilterChange={onFilterChange}
                                />
                            ))}
                        </div>

                        {!vertical &&
                            <div className="flex items-end">
                                <button
                                    onClick={onSubmit}
                                    className="mb-1 h-8 px-4 bg-white/80 text-gray-900 text-sm font-medium rounded-full shadow-sm hover:bg-white transition duration-200"
                                >
                                    Buscar
                                </button>
                            </div>

                        }
                    </div>

                </div>
            </div>
        </>
    );
};