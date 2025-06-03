import type { FC } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Parking } from "../../../interfaces/Parking";
import { MiniMap } from "../../../components/Maps/MiniMapComponent/MiniMapComponent";
import { BotonAgregarComponent } from "../../../components/__Admin/BotonAgregarComponent/BotonAgregarComponent";
import { useNavigate } from "react-router-dom";
import { ModalEditarParkingComponent } from "../../../components/Modal/ModalEditarParkingComponent/ModalEditarParkingComponent";
import { ModalEliminarParkingComponent } from "../../../components/Modal/ModalEliminarParkingComponent/ModalEliminarParkingComponent";
import { httpGetTok } from "../../../utils/apiService";
import { createEmptyPage, type PageProps } from "../../../interfaces/PageProps";
import { PaginacionComponent } from "../../../components/PaginacionComponent/PaginacionComponent";

export const ParkingsAdminPage: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [parkings, setParkings] = useState<PageProps<Parking>>(createEmptyPage<Parking>());
    const [selected, setSelected] = useState<Parking>(Parking);

    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const [paginaActual, setPaginaActual] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const peticionParkings = async () => {
        const response = await httpGetTok<PageProps<Parking>>(`/parkings?page=${paginaActual}&size=${pageSize}`);
        if (response) {
            setParkings(response);
        } else {
            console.error("Fallo al obtener los datos de la página", paginaActual);
        }
    };

    useEffect(() => {
        peticionParkings();
    }, [paginaActual, pageSize]);

    useEffect(() => {
        peticionParkings();
    }, []);

    function handleAgregar() {
        navigate("/admin/parkings/crear");
    }

    const handleEditar = (parking: Parking) => {
        setSelected(parking);
        setShowUpdate(true);
    };

    const handleEliminar = (parking: Parking) => {
        setSelected(parking);
        setShowDelete(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t("admin.parkings.title")}</h1>
                <BotonAgregarComponent text={t("admin.parkings.addButton")} onClick={handleAgregar} />
            </div>

            <table className="w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden text-left">
                <thead className="bg-white/10">
                    <tr>
                        <th className="px-4 py-2">{t("admin.parkings.table.name")}</th>
                        <th className="px-4 py-2">{t("admin.parkings.table.capacity")}</th>
                        <th className="px-4 py-2">{t("admin.parkings.table.location")}</th>
                        <th className="px-4 py-2">{t("admin.parkings.table.actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {parkings.content.map((p) => (
                        <tr key={p.id} className="hover:bg-white/10 cursor-pointer transition">
                            <td className="px-4 py-3">{p.name}</td>
                            <td className="px-4 py-3">{p.capacity}</td>
                            <td className="px-4 py-3">
                                <MiniMap polygon={p.polygon} />
                            </td>
                            <td className="px-4 py-3 space-x-2">
                                <button onClick={() => handleEditar(p)} className="text-blue-400 hover:underline">
                                    {t("admin.parkings.actions.edit")}
                                </button>
                                <button onClick={() => handleEliminar(p)} className="text-red-400 hover:underline">
                                    {t("admin.parkings.actions.delete")}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-10 px-10 pb-20">
                <PaginacionComponent
                    currentPage={paginaActual}
                    totalItems={parkings.totalElements}
                    pageSize={pageSize}
                    onPageChange={(p) => setPaginaActual(p)}
                    onPageSizeChange={(s) => {
                        setPageSize(s);
                        setPaginaActual(0);
                    }}
                />
            </div>

            {showUpdate && (
                <ModalEditarParkingComponent
                    parking={selected}
                    onClose={() => {
                        setShowUpdate(false);
                        peticionParkings();
                    }}
                />
            )}

            {showDelete && (
                <ModalEliminarParkingComponent
                    parking={selected}
                    onClose={() => {
                        setShowDelete(false);
                        peticionParkings();
                    }}
                />
            )}
        </div>
    );
};
