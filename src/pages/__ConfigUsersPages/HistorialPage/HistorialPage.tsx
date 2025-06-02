import { useState, type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import type { Historial } from "../../../interfaces/Historial";
import { httpGetTok } from "../../../utils/apiService";
import { UsuarioMe } from "../../../interfaces/Usuario";


export const HistorialPage: FC = () => {
    const [historial, setHistorial] = useState<Historial[]>([]);
    const [usuario, setUsuario] = useState<UsuarioMe>(UsuarioMe);

    usuario.username = "Jorgito2"
    
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            const data = await httpGetTok<UsuarioMe>("/usuarios/me");
            if (data) {
                setUsuario(data);
            }
        };
        fetch();

    }, []);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const data = await httpGetTok<Historial[]>(`/historial/usuario/${usuario.username}`);
                if (data) {
                    setHistorial(data);
                    console.log(data)
                }
            } catch (error) {
                console.error("Error al cargar reservas:", error);
            }
        };

        fetchReservas();
    }, []);

    return (
        <FondoPanelComponent>
            <div className="relative min-h-screen  p-8 text-white">
                <TituloComponent titulo={"Historial de Viajes"} />

                <div className="max-w-4xl mx-auto w-full  p-6 rounded-2xl ">


                    {historial.length === 0 ? (
                        <p className="text-gray-400">No hay viajes registrados aún.</p>
                    ) : (
                        <div className="space-y-4">
                            {historial.map((viaje) => (
                                <div
                                    key={viaje.id}
                                    onClick={() => navigate(`/panel/viajes/${viaje.id}`)}
                                    className="bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {viaje.origen} → {viaje.destino}
                                                Prueba, aun falta aqui
                                            </h2>
                                            <p className="text-sm text-gray-400">
                                                Fecha Inicio: {new Date(viaje.fechaInicio).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Fecha Fin: {new Date(viaje.fechaFin).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Duración: {viaje.duracion}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Km Recorridos: {viaje.kmRecorridos}
                                            </p>
                                        </div>
                                        {/* <button
                                            onClick={() => navigate(`/panel/viajes/${viaje.id}`)}
                                            className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                                        >
                                            Ver detalle
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </FondoPanelComponent>
    );
}