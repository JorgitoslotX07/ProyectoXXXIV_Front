import { useEffect, useState, useRef, useCallback, type FC } from "react";
import { SubCategoriasComponent } from "../../components/SubCategoriasComponent/SubCategoriasComponent";
import { FiltrersCatalogComponent } from "../../components/FiltrersCatalogComponent/FiltrersCatalogComponent";
import { ProductosCatalogComponent } from "../../components/ProductosCatalogComponent/ProductosCatalogComponent";
import { PageVehiculos, type PageProps } from "../../interfaces/PageProps";
import type { FiltroVehiculo, Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet, httpGetParam } from "../../utils/apiService";
import { PaginacionComponent } from "../../components/PaginacionComponent/PaginacionComponent";

interface Props {
  modoClaro: boolean;
}

export const CatalogPage: FC<Props> = ({ modoClaro }) => {
  const [vehiculos, setVehiculos] = useState<PageProps<Vehiculo>>(PageVehiculos);
  const [vehiculosFiltro, setVehiculosFiltro] = useState<PageProps<Vehiculo>>(PageVehiculos);
  const [filtrosActivos, setFiltrosActivos] = useState<
    Partial<Record<FiltroVehiculo, string | number | boolean>>
  >({});
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const filtroRef = useRef<HTMLDivElement>(null);

  const peticionVehiculos = useCallback(async () => {
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
  }, [paginaActual, pageSize]);

  useEffect(() => {
    peticionVehiculos();
  }, [paginaActual, pageSize, peticionVehiculos]);

  function actualizarFiltro(clave: FiltroVehiculo, valor: string | number | boolean) {
    const nuevosFiltros = {
      ...filtrosActivos,
      [clave]: valor,
    };
    if (valor === "" || valor === null) {
      delete nuevosFiltros[clave];
    }
    setFiltrosActivos(nuevosFiltros);
  }

  async function buscar(): Promise<void> {
    const response = await httpGetParam<
      PageProps<Vehiculo>,
      Partial<Record<FiltroVehiculo, string | number | boolean>>
    >(`/vehiculos?page=${paginaActual}&size=${pageSize}`, filtrosActivos);
    if (response) {
      setVehiculos(response);
    } else {
      console.error("Fallo al obtener los datos de la página", paginaActual);
    }
  }

  return (
    <div className={modoClaro ? "bg-[#FAF9ED] text-[#333]" : "bg-[#111827] text-white"}>
      <div className="relative">
        {/* ✅ Imagen de fondo NO SE TOCA */}
        <div className="absolute inset-0 bg-[url('/fondoCatalog.webp')] bg-cover bg-center opacity-5"></div>

        {/* ✅ Fondo difuminado adaptado por modo */}
        {modoClaro ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCE8] to-[#E6F7E6] opacity-50 rounded-[12px]" />
        ) : (
          <div className="absolute inset-0 bg-[rgba(35,17,79,0.30)] backdrop-blur-[20px] backdrop-saturate-[300%] rounded-[12px] border border-[rgba(255,255,255,0.125)] opacity-60" />
        )}

        <div className="relative z-10 p-10">
          <SubCategoriasComponent
            onFilterSelect={(tipoSeleccionado) => {
              actualizarFiltro("tipo", tipoSeleccionado);
              buscar();
              setTimeout(() => {
                filtroRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          />

          <div ref={filtroRef}>
            <FiltrersCatalogComponent
              onFilterChange={actualizarFiltro}
              vehiculos={vehiculosFiltro}
              vertical={false}
              onSubmit={() => buscar()}
              filtros={filtrosActivos}
              modoClaro={modoClaro}
            />
          </div>

          <div className="mt-3">
            <ProductosCatalogComponent vehiculos={vehiculos} modoClaro={modoClaro} />
          </div>

          <div className="mt-10 px-10 pb-20">
            <PaginacionComponent
              currentPage={paginaActual}
              totalItems={vehiculos.totalElements}
              pageSize={pageSize}
              onPageChange={(p) => setPaginaActual(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPaginaActual(0);
              }}
              modoClaro={modoClaro}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
