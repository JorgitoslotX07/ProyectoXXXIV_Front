import { useEffect, useState, useRef, type FC } from "react";
import { SubCategoriasComponent } from "../../components/SubCategoriasComponent/SubCategoriasComponent";
import { FiltrersCatalogComponent } from "../../components/FiltrersCatalogComponent/FiltrersCatalogComponent";
import { ProductosCatalogComponent } from "../../components/ProductosCatalogComponent/ProductosCatalogComponent";
import { createEmptyPage, type PageProps } from "../../interfaces/PageProps";
import type { FiltroVehiculo, Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet, httpGetParam } from "../../utils/apiService";
import { PaginacionComponent } from "../../components/PaginacionComponent/PaginacionComponent";
import type { ModoClaroProps } from "../../interfaces/ModoClaroProps";

export const CatalogPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  const [vehiculos, setVehiculos] = useState<PageProps<Vehiculo>>(createEmptyPage<Vehiculo>());
  const [vehiculosFiltro, setVehiculosFiltro] = useState<PageProps<Vehiculo>>(createEmptyPage<Vehiculo>());
  const [filtrosActivos, setFiltrosActivos] = useState<Partial<Record<FiltroVehiculo, string | number | boolean>>>({});
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const filtroRef = useRef<HTMLDivElement>(null);

  const peticionVehiculos = async () => {
    const response = await httpGet<PageProps<Vehiculo>>(
      `/vehiculos?page=${paginaActual}&size=${pageSize}`
    );
    if (response) {
      setVehiculos(response);
      setVehiculosFiltro(response);
      setPaginaActual(response.number);
    } else {
      console.error("Fallo al obtener los datos de la página", paginaActual);
    }
  };

  useEffect(() => {
    peticionVehiculos();
  }, [paginaActual, pageSize]);

  useEffect(() => {
    peticionVehiculos();
  }, []);

  async function actualizarFiltro(clave: FiltroVehiculo, valor: string | number | boolean) {
    const nuevosFiltros = {
      ...filtrosActivos,
      [clave]: valor,
    };
    if (valor === "" || valor === null) {
      delete nuevosFiltros[clave];
    }
    setFiltrosActivos(nuevosFiltros);
    await buscar(nuevosFiltros);
  }

  async function buscar(filtro: Partial<Record<FiltroVehiculo, string | number | boolean>> = filtrosActivos): Promise<void> {
    const response = await httpGetParam<
      PageProps<Vehiculo>,
      Partial<Record<FiltroVehiculo, string | number | boolean>>
    >(`/vehiculos?page=${paginaActual}&size=${pageSize}`, filtro);
    if (response) {
      setVehiculos(response);
    } else {
      console.error("Fallo al obtener los datos de la página", paginaActual);
    }
  }

  return (
    <div
      className={`min-h-screen ${modoClaro ? "bg-gradient-to-br from-[#e0fbea] to-[#fef9c3] text-[#1f2937]" : "bg-[#111827] text-white"
        } transition-colors duration-300`}
    >
      <div className="relative">
        <div
          className={`absolute inset-0 ${modoClaro
            ? "bg-[url('/fondoFastSeartchClaro.jpeg')]"
            : "bg-[url('/fondoCatalog.webp')]"
            } bg-cover bg-center opacity-5`}
        ></div>

        <div
          className={`absolute inset-0 ${modoClaro
            ? "bg-white/60"
            : "bg-[rgba(35,17,79,0.30)]"
            } backdrop-blur-[20px] backdrop-saturate-[300%] rounded-[12px] border border-[rgba(255,255,255,0.125)]`}
        ></div>

        <div className="relative z-10 p-6 md:p-10">
          <SubCategoriasComponent
            onFilterSelect={(tipoSeleccionado) => {
              actualizarFiltro("tipo", tipoSeleccionado);
              buscar();
              setTimeout(() => {
                filtroRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          />

        <FiltrersCatalogComponent
  onFilterChange={actualizarFiltro}
  vehiculos={vehiculosFiltro}
  vertical={false}
  filtros={filtrosActivos}
  modoClaro={modoClaro}
/>

          <div className="mt-6">
            <ProductosCatalogComponent vehiculos={vehiculos} modoClaro={modoClaro}/>
          </div>

          <div className="mt-10 px-4 md:px-10 pb-20">
            <PaginacionComponent modoClaro={modoClaro}
              currentPage={paginaActual}
              totalItems={vehiculos.totalElements}
              pageSize={pageSize}
              onPageChange={(p) => setPaginaActual(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPaginaActual(0);
                
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
