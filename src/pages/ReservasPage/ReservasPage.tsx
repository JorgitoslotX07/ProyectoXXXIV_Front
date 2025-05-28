import { type FC, type ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGetTok } from "../../utils/apiService";
import type { Reserva } from "../../interfaces/ReservaProps";
import { VolverPanelComonent } from "../../components/VolverPanelComonent/VolverPanelComonent";

export const mockReservas = [
    {
        id: "res1",
        vehiculo: "Toyota Corolla 2022",
        fechaInicio: "2025-06-01T10:00:00Z",
        fechaFin: "2025-06-05T10:00:00Z",
        estado: "activa",
    },
    {
        id: "res2",
        vehiculo: "Volkswagen Golf GTI",
        fechaInicio: "2025-05-15T09:00:00Z",
        fechaFin: "2025-05-18T18:00:00Z",
        estado: "finalizada",
    },
    {
        id: "res3",
        vehiculo: "Tesla Model 3",
        fechaInicio: "2025-07-10T12:00:00Z",
        fechaFin: "2025-07-15T12:00:00Z",
        estado: "pendiente",
    },
    {
        id: "res4",
        vehiculo: "BMW X5 Híbrido",
        fechaInicio: "2025-06-20T08:30:00Z",
        fechaFin: "2025-06-25T17:00:00Z",
        estado: "cancelada",
    },
];


export const ReservasPage: FC = (): ReactElement => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const navigate = useNavigate();

    //   useEffect(() => {
    //     const fetchReservas = async () => {
    //       try {
    //         const data = await httpGetTok<Reserva[]>("/reservas/mis-reservas");
    //         if (data) setReservas(data);
    //       } catch (error) {
    //         console.error("Error al cargar reservas:", error);
    //       }
    //     };

    //     fetchReservas();
    //   }, []);

    useEffect(() => {
        setReservas(mockReservas);
    }, []);


    return (
        <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
            <div className="absolute inset-0 bg-[url('/fondoPanel.jpg')] bg-cover bg-center opacity-20"></div>
            <div className="relative min-h-screen  p-8 text-white">
                <div className="max-w-4xl mx-auto w-full bg-[#111827] p-6 rounded-2xl shadow-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                        <VolverPanelComonent />

                        <h1 className="text-2xl font-bold flex items-center gap-2 text-right">
                            Mis Reservas
                        </h1>
                    </div>

                    {reservas.length === 0 ? (
                        <p className="text-gray-400">No tienes reservas activas.</p>
                    ) : (
                        <div className="space-y-4">
                            {reservas.map((reserva) => (
                                <div
                                    key={reserva.id}
                                    className="bg-[#1f2937] border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-semibold">{reserva.vehiculo}</h2>
                                            <p className="text-sm text-gray-400">
                                                Fecha Reserva:{" "}
                                                {new Date(reserva.fechaInicio).toLocaleDateString()}
                                            </p>
                                            <p
                                                className={`mt-1 text-sm font-medium ${reserva.estado === "activa"
                                                    ? "text-green-400"
                                                    : reserva.estado === "finalizada"
                                                        ? "text-gray-400"
                                                        : reserva.estado === "cancelada"
                                                            ? "text-red-400"
                                                            : "text-yellow-400"
                                                    }`}
                                            >
                                                Estado: {reserva.estado}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/panel/reservas/${reserva.id}`)}
                                            className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                                        >
                                            Ver detalle
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
