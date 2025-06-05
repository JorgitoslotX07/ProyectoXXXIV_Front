import { type FC, type ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGetTok } from "../../../utils/apiService";
import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import { createEmptyPage, type PageProps } from "../../../interfaces/PageProps";
import type { Viaje } from "../../../interfaces/Viaje";

export const ViajesPage: FC = (): ReactElement => {
    const [viajes, setViajes] = useState<PageProps<Viaje>>(
        createEmptyPage<Viaje>()
    );
    const navigate = useNavigate();


    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const data = await httpGetTok<PageProps<Viaje>>(`/viajes`);
                console.log(data);
                if (data) setViajes(data);
            } catch (error) {
                console.error("Error al cargar reservas:", error);
            }
        };

        fetchReservas();
    }, []);


    return (
        <FondoPanelComponent>
            <div className="relative min-h-screen  p-8 text-white">
                <TituloComponent titulo={"Mis Reservas"} />

                <div className="max-w-4xl mx-auto w-full mt-20">
                    {viajes.content.length === 0 ? (
                        <p className="text-gray-400">No tienes viajes registrados.</p>
                    ) : (
                        <div className="space-y-4">
                            {viajes.content.map((viaje) => (
                                <div
                                    key={viaje.id}
                                    className="bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95"
                                    onClick={() => navigate(`/panel/viajes/${viaje.id}`)}
                                >
                                    <div className="p-4  space-y-2">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-semibold">
                                                {`${viaje.vehiculo.marca} ${viaje.vehiculo.modelo}`}
                                            </h2>

                                            {
                                                viaje.precio ? (
                                                    <p
                                                        className={`text-sm font-medium `}
                                                    >
                                                        Precio: {viaje.precio} €
                                                    </p>
                                                ) : (
                                                    <p
                                                        className={`text-sm font-medium  text-green-400`}
                                                    >
                                                        EN CURSO
                                                    </p>
                                                )
                                            }
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">

                                            <p>
                                                <span className="font-medium text-gray-500">
                                                    Inicio Viaje:
                                                </span>{" "}
                                                {new Date(
                                                    viaje.fechaInicio
                                                ).toLocaleDateString()}
                                            </p>
                                            {viaje.fechaFin && (
                                                <p>
                                                    <span className="font-medium text-gray-500">
                                                        Fin Viaje:
                                                    </span>{" "}
                                                    {new Date(viaje.fechaFin).toLocaleDateString()}
                                                </p>
                                            )}
                                            {viaje.kmRecorridos !== null && (
                                                <p>
                                                    <span className="font-medium text-gray-500">
                                                        Km Recorridos:
                                                    </span>{" "}
                                                    {viaje.kmRecorridos}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </FondoPanelComponent>
    );
};
