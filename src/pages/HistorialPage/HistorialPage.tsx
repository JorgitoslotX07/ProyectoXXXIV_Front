import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { VolverPanelComonent } from "../../components/VolverPanelComonent/VolverPanelComonent";

const viajesFalsos = [
    {
        id: "viaje1",
        origen: "Madrid",
        destino: "Barcelona",
        fecha: "2025-04-12",
        duracion: "6h 30min",
        costo: "45€",
    },
    {
        id: "viaje2",
        origen: "Valencia",
        destino: "Sevilla",
        fecha: "2025-03-28",
        duracion: "7h 15min",
        costo: "50€",
    },
    {
        id: "viaje3",
        origen: "Bilbao",
        destino: "Zaragoza",
        fecha: "2025-02-18",
        duracion: "3h 45min",
        costo: "30€",
    },
];


export const HistorialPage: FC = () => {
    const [viajes] = useState(viajesFalsos);
    const navigate = useNavigate();

    return (
        <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
            <div className="absolute inset-0 bg-[url('/fondoPanel.jpg')] bg-cover bg-center opacity-20"></div>
            <div className="relative min-h-screen  p-8 text-white">
                <div className="max-w-4xl mx-auto w-full bg-[#111827] p-6 rounded-2xl shadow-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                        <VolverPanelComonent />

                        <h1 className="text-2xl font-bold flex items-center gap-2 text-right">
                            Historial de Viajes
                        </h1>
                    </div>

                    {viajes.length === 0 ? (
                        <p className="text-gray-400">No hay viajes registrados aún.</p>
                    ) : (
                        <div className="space-y-4">
                            {viajes.map((viaje) => (
                                <div
                                    key={viaje.id}
                                    className="bg-[#1f2937] border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {viaje.origen} → {viaje.destino}
                                            </h2>
                                            <p className="text-sm text-gray-400">
                                                Fecha: {new Date(viaje.fecha).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Duración: {viaje.duracion}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Costo: {viaje.costo}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/panel/viajes/${viaje.id}`)}
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
}