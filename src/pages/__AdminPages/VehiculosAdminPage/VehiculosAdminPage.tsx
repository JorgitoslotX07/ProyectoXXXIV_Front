import type { FC } from "react";
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
import type { ModoClaroProps } from "../../../interfaces/ModoClaroProps";

export const VehiculosAdminPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  const { t } = useTranslation();

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

  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<Vehiculo>(Vehiculo);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const peticionVehiculos = async () => {
    const response = await httpGet<PageProps<Vehiculo>>(
      `/vehiculos?page=${paginaActual}&size=${pageSize}`
    );
    if (response) {
      setVehiculos(response);
      setVehiculosFiltro(response);
      setPaginaActual(response.number);
    }
  };

  useEffect(() => {
    peticionVehiculos();
  }, [paginaActual, pageSize]);

  useEffect(() => {
    peticionVehiculos();
  }, []);

  function actualizarFiltro(clave: FiltroVehiculo, valor: string | number | boolean) {
    const nuevosFiltros = { ...filtrosActivos, [clave]: valor };
    if (valor === "" || valor === null) delete nuevosFiltros[clave];
    setFiltrosActivos(nuevosFiltros);
  }

  async function buscar() {
    const response = await httpGetParam<
      PageProps<Vehiculo>,
      Partial<Record<FiltroVehiculo, string | number | boolean>>
    >(`/vehiculos?page=${paginaActual}&size=${pageSize}`, filtrosActivos);
    if (response) {
      setVehiculos(response);
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
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        modoClaro
          ? "bg-gradient-to-br from-yellow-50 to-yellow-100 text-gray-800"
          : "bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("admin.vehiculos.titulo")}</h1>
          <BotonAgregarComponent text={t("admin.vehiculos.agregar")} onClick={handleAgregar} />
        </div>

        <div
          className={`overflow-x-auto rounded-xl p-4 border backdrop-blur-md ${
            modoClaro ? "bg-white border-gray-300" : "bg-white/5 border-white/10"
          }`}
        >
          <FiltrersCatalogComponent
            onFilterChange={actualizarFiltro}
            vehiculos={vehiculosFiltro}
            vertical={false}
            onSubmit={buscar}
            filtros={filtrosActivos}
          />

          <table className="min-w-full text-left text-sm mt-6">
            <thead
              className={`border-b ${
                modoClaro ? "border-gray-300 text-gray-700" : "border-white/10 text-gray-300"
              }`}
            >
              <tr>
                <th className="px-4 py-2">{t("admin.vehiculos.id")}</th>
                <th className="px-4 py-2">{t("admin.vehiculos.marca")}</th>
                <th className="px-4 py-2">{t("admin.vehiculos.modelo")}</th>
                <th className="px-4 py-2">{t("admin.vehiculos.estado")}</th>
                <th className="px-4 py-2">{t("admin.vehiculos.acciones")}</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.content.map((v) => (
                <tr
                  key={v.id}
                  className={`border-t ${
                    modoClaro ? "border-gray-200 hover:bg-yellow-50" : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <td className="px-4 py-2">{v.id}</td>
                  <td className="px-4 py-2">{v.marca}</td>
                  <td className="px-4 py-2">{v.modelo}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        {
                          DISPONIBLE: "text-green-500",
                          EN_USO: "text-blue-500",
                          RESERVADO: "text-yellow-500",
                          EN_MANTENIMIENTO: "text-red-500",
                        }[v.estado]
                      }`}
                    >
                      {t(`admin.vehiculos.estado_${v.estado.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEditar(v)}
                      className="text-blue-500 hover:underline"
                    >
                      {t("admin.vehiculos.editar")}
                    </button>
                    <button
                      onClick={() => handleEliminar(v)}
                      className="text-red-500 hover:underline"
                    >
                      {t("admin.vehiculos.eliminar")}
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
              onPageChange={setPaginaActual}
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
          } } modoClaro={modoClaro}        />
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
