import { useEffect, type FC, useState } from "react";
import { SubCategoriasComponent } from "../../components/SubCategoriasComponent/SubCategoriasComponent";
import { FiltrersCatalogComponent } from "../../components/FiltrersCatalogComponent/FiltrersCatalogComponent";
import { ProductosCatalogComponent } from "../../components/ProductosCatalogComponent/ProductosCatalogComponent";
import { PageVehiculos, type PageProps } from "../../interfaces/PageProps";
import type { FiltroVehiculo, Vehiculo } from "../../interfaces/Vehiculo";
import { httpGet, httpGetParam } from "../../utils/apiService";
import { PaginacionComponent } from "../../components/PaginacionComponent/PaginacionComponent";
import { motion } from "framer-motion";

export const CatalogPage: FC = () => {
  const [vehiculos, setVehiculos] = useState<PageProps<Vehiculo>>(PageVehiculos);
  const [vehiculosFiltro, setVehiculosFiltro] = useState<PageProps<Vehiculo>>(PageVehiculos);
  const [filtrosActivos, setFiltrosActivos] = useState<Partial<Record<FiltroVehiculo, string | number | boolean>>>({});
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  async function peticionVehiculos() {
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
  }

  useEffect(() => {
    peticionVehiculos();
  }, []);

  useEffect(() => {
    peticionVehiculos();
  }, [paginaActual, pageSize]);

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
    <div className="bg-[#111827]">
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/fondoCatalog.webp')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-[rgba(35,17,79,0.30)] backdrop-blur-[20px] backdrop-saturate-[300%] rounded-[12px] border border-[rgba(255,255,255,0.125)] bg-cover bg-center opacity-60"></div>
        <motion.div
          className="relative z-10 text-white p-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <SubCategoriasComponent />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <FiltrersCatalogComponent
              onFilterChange={actualizarFiltro}
              vehiculos={vehiculosFiltro}
              vertical={false}
              onSubmit={() => buscar()}
            />
          </motion.div>

          <motion.div
            className="mt-3"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          >
            <ProductosCatalogComponent vehiculos={vehiculos} />
          </motion.div>

          <motion.div
            className="mt-10 px-10 pb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          >
            <PaginacionComponent
              currentPage={paginaActual}
              totalItems={vehiculos.totalElements}
              pageSize={pageSize}
              onPageChange={(p) => setPaginaActual(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPaginaActual(0);
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
