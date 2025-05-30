import type { FC } from "react";
import { useState } from "react";
import { Parking } from "../../../interfaces/Parking";
import { MiniMap } from "../../../components/Maps/MiniMapComponent/MiniMapComponent";
import { BotonAgregarComponent } from "../../../components/__Admin/BotonAgregarComponent/BotonAgregarComponent";
import { useNavigate } from "react-router-dom";
import { ModalEditarParkingComponent } from "../../../components/Modal/ModalEditarParkingComponent/ModalEditarParkingComponent";
import { ModalEliminarParkingComponent } from "../../../components/Modal/ModalEliminarParkingComponent/ModalEliminarParkingComponent";


const mockParkings: Parking[] = [
    {
        id: 1,
        name: "Parking Centro",
        capacity: 50,
        polygon: [
            [40.4168, -3.7038],
            [40.4172, -3.7030],
            [40.4165, -3.7025],
        ],
    },
    {
        id: 2,
        name: "Parking Norte",
        capacity: 30,
        polygon: [
            [40.4200, -3.7100],
            [40.4205, -3.7095],
            [40.4202, -3.7090],
        ],
    },
];

export const ParkingsAdminPage: FC = () => {
    const navigate = useNavigate();

    const [parkings, setParkings] = useState<Parking[]>(mockParkings);
    const [selected, setSelected] = useState<Parking>(Parking);

    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    function handleAgregar() {
        navigate("/admin/parkings/crear")
    }

    const handleEditar = (parking: Parking) => {
        setSelected(parking);
        setShowUpdate(true)
    };
    const handleEliminar = (parking: Parking) => {
        setSelected(parking);
        setShowDelete(true)
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Parkings</h1>
                <BotonAgregarComponent text={"Añadir Parkin"} onClick={handleAgregar} />

            </div>
            <table className="w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden text-left">
                <thead className="bg-white/10">
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Capacidad</th>
                        <th className="px-4 py-2">Ubicación</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {parkings.map((p) => (
                        <tr
                            key={p.id}
                            className="hover:bg-white/10 cursor-pointer transition"
                        >
                            <td className="px-4 py-3">{p.name}</td>
                            <td className="px-4 py-3">{p.capacity}</td>
                            <td className="px-4 py-3">
                                <MiniMap polygon={p.polygon} />
                            </td>
                            <td className="px-4 py-3 space-x-2">
                                <button
                                    onClick={() => handleEditar(p)}
                                    className="text-blue-400 hover:underline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleEliminar(p)}
                                    className="text-red-400 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {showUpdate && (
                <ModalEditarParkingComponent parking={selected} onClose={() => setShowUpdate(false)} />
            )}
            {showDelete && (
                <ModalEliminarParkingComponent parking={selected} onClose={() => setShowDelete(false)} />
            )}
        </div>
    );
}