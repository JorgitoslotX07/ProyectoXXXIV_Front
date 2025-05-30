import { useState, type FC, useEffect } from "react";
import type { VehiculoPos } from "../../../interfaces/Vehiculo";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

const mockVehiculos: VehiculoPos[] = [
    {
        id: 1,
        marca: "Toyota",
        modelo: "Corolla",
        ruta: [
            [40.4168, -3.7038],
            [40.417, -3.702],
            [40.418, -3.700],
        ],
    },
    {
        id: 2,
        marca: "Honda",
        modelo: "Civic",
        ruta: [
            [40.418, -3.712],
            [40.419, -3.710],
            [40.420, -3.708],
        ],
    },
];

export const SeguimientoVehiculosAdminPage: FC = () => {

    const [vehiculos, setVehiculos] = useState<VehiculoPos[]>(mockVehiculos);
    const [selected, setSelected] = useState<VehiculoPos | null>(null);
    const [livePos, setLivePos] = useState<[number, number][]>([]);

    // Simulación de updates en tiempo real empujando la última posición
    useEffect(() => {
        const interval = setInterval(() => {
            setVehiculos((vlist) =>
                vlist.map((v) => {
                    const last = v.ruta[v.ruta.length - 1];
                    const next: [number, number] = [
                        last[0] + (Math.random() - 0.5) * 0.0005,
                        last[1] + (Math.random() - 0.5) * 0.0005,
                    ];
                    return { ...v, ruta: [...v.ruta, next] };
                })
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Actualiza livePos cuando cambia selected vehicle
    useEffect(() => {
        if (selected) setLivePos(selected.ruta);
        else setLivePos([]);
    }, [selected]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-white flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-1/4 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Vehículos</h2>
                <ul className="space-y-2">
                    {vehiculos.map((v) => (
                        <li
                            key={v.id}
                            onClick={() => setSelected(v)}
                            className={`p-3 rounded-lg cursor-pointer transition hover:bg-white/10 ${selected?.id === v.id ? 'bg-white/20' : ''
                                }`}
                        >
                            <p className="font-medium">{v.marca} {v.modelo}</p>
                            <p className="text-sm text-gray-300">ID: {v.id}</p>
                        </li>
                    ))}
                </ul>
            </aside>

            <div className="flex-1 flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Seguimiento de Vehículos</h1>
                <MapContainer
                    center={selected ? livePos[livePos.length - 1] : [40.4168, -3.7038]}
                    zoom={13}
                    className="flex-1 w-full rounded-2xl shadow-lg"
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {vehiculos.map((v) => {
                        const pos = v.ruta[v.ruta.length - 1];
                        return (
                            <Marker
                                key={v.id}
                                position={pos}
                                eventHandlers={{ click: () => setSelected(v) }}
                            >
                                <Popup>{v.marca} {v.modelo}</Popup>
                            </Marker>
                        );
                    })}
                    {livePos.length > 1 && (
                        // esta es la parte del seguimiento para mostrar la ruta del coche selecionado
                        <Polyline positions={livePos} pathOptions={{ color: '#22c55e', weight: 4 }} />
                    )}
                </MapContainer>

                {selected && (
                    <div className="mt-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <h2 className="text-lg font-semibold mb-2">
                            Ruta de {selected.marca} {selected.modelo}
                        </h2>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300 max-h-40 overflow-y-auto">
                            {livePos.map((coord, idx) => (
                                <li key={idx}>
                                    Lat: {coord[0].toFixed(5)}, Lng: {coord[1].toFixed(5)}
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
}
