import type { FC } from "react";

//     return <h2 className="text-xl font-semibold">Gestión de Vehículos</h2>;
// }

// src/pages/admin/VehiculosAdminPage.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Vehiculo, type FiltroVehiculo } from "../../../interfaces/Vehiculo";
import { type PageProps, createEmptyPage } from "../../../interfaces/PageProps";
import { httpGet, httpGetParam } from "../../../utils/apiService";
import { PaginacionComponent } from "../../../components/PaginacionComponent/PaginacionComponent";
import { FiltrersCatalogComponent } from "../../../components/FiltrersCatalogComponent/FiltrersCatalogComponent";
import { ModalCrearVehiculoComponent } from "../../../components/Modal/ModalCrearVehiculoComponent/ModalCrearVehiculoComponent";
import { BotonAgregarComponent } from "../../../components/__Admin/BotonAgregarComponent/BotonAgregarComponent";
import { ModalEliminarVehiculo } from "../../../components/Modal/ModalEliminarVehiculoComponent/ModalEliminarVehiculoComponent";
import { ModalEditarVehiculo } from "../../../components/Modal/ModalEditarVehiculoComponent/ModalEditarVehiculoComponent";

export const VehiculosAdminPage: FC = () => {
  const [vehiculos, setVehiculos] = useState<PageProps<Vehiculo>>(
    createEmptyPage<Vehiculo>()
  );
  const [vehiculosFiltro, setVehiculosFiltro] = useState<PageProps<Vehiculo>>(
    createEmptyPage<Vehiculo>()
  );
  const [filtrosActivos, setFiltrosActivos] = useState<
    Partial<Record<FiltroVehiculo, string | number | boolean>>
  >({});
  const [paginaActual, setPaginaActual] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [vehiculoSeleccionado, setVehiculoSeleccionado] =
    useState<Vehiculo>(Vehiculo);

  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

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

  function actualizarFiltro(
    clave: FiltroVehiculo,
    valor: string | number | boolean
  ) {
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

  const handleEditar = (vehiculo: Vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setShowUpdate(true);
  };
  const handleEliminar = (vehiculo: Vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setShowDelete(true);
  };
  const handleAgregar = () => {
    setShowAdd(true);
  };

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Vehículos</h1>
          <BotonAgregarComponent
            text={"Añadir Vehiculo"}
            onClick={handleAgregar}
          />
        </div>

        <div className="overflow-x-auto rounded-xl bg-white/5 p-4 backdrop-blur-md border border-white/10">
          <div>
            <FiltrersCatalogComponent
              onFilterChange={actualizarFiltro}
              vehiculos={vehiculosFiltro}
              vertical={false}
              onSubmit={() => buscar()}
              filtros={filtrosActivos} // para mantener valor visual
            />
          </div>
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 text-gray-300">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Marca</th>
                <th className="px-4 py-2">Modelo</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.content.map((v) => (
                <tr
                  key={v.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-2">{v.id}</td>
                  <td className="px-4 py-2">{v.marca}</td>
                  <td className="px-4 py-2">{v.modelo}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        {
                          DISPONIBLE: "text-green-400",
                          EN_USO: "text-blue-400",
                          RESERVADO: "text-yellow-400",
                          EN_MANTENIMIENTO: "text-red-400",
                        }[v.estado]
                      }`}
                    >
                      {v.estado.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEditar(v)}
                      className="text-blue-400 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(v)}
                      className="text-red-400 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            />
          </div>
        </div>
      </div>

      {showDelete && (
        <ModalEliminarVehiculo
          vehiculo={vehiculoSeleccionado}
          onClose={() => {
            setShowDelete(false);
            peticionVehiculos();
          }}
        />
      )}
      {showUpdate && (
        <ModalEditarVehiculo
          vehiculo={vehiculoSeleccionado}
          onClose={() => {
            setShowUpdate(false);
            peticionVehiculos();
          }}
        />
      )}
      {showAdd && (
        <ModalCrearVehiculoComponent
          onClose={() => {
            setShowAdd(false);
            peticionVehiculos();
          }}
        />
      )}
    </div>
  );
};
