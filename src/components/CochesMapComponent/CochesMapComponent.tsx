import { MapContainer, TileLayer, Popup, Rectangle, Tooltip, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

const cocheIcon = new L.Icon({
    iconUrl: "/simbolomarcador.png",
    iconSize: [40, 45],
    iconAnchor: [20, 40],
});

const center: [number, number] = [41.119072, 1.245370];

// Coches Simulados
const coches = [
    {
        id: 1,
        modelo: "Tesla Model 3",
        foto: "/TeslaModel3.png",
        lat: 41.124313,
        lng: 1.241537,
    },
    {
        id: 2,
        modelo: "Renault Zoe",
        foto: "/RenaultZoeE.png",
        lat: 41.121406,
        lng: 1.256194,
    },
    {
        id: 3,
        modelo: "Fiat 500e",
        foto: "/Fiat500e.png",
        lat: 41.121211,
        lng: 1.256069,
    },
];

// Parkings Simulados
const zonasParking = [
    {
        id: 1,
        nombre: "Parking Estación",
        bounds: [
            [41.1235, 1.239],
            [41.1245, 1.242],
        ],
    },
    {
        id: 2,
        nombre: "Parking Centro Comercial",
        bounds: [
            [41.1205, 1.254],
            [41.1215, 1.257],
        ],
    },
];

// Marcador con zoom y selección
const ZoomOnClickMarker = ({
    coche,
    onSelect,
}: {
    coche: typeof coches[0];
    onSelect: (coche: typeof coches[0]) => void;
}) => {
    const map = useMap();

    const handleClick = () => {
        map.flyTo([coche.lat, coche.lng], 17, {
            duration: 1.5,
        });
        onSelect(coche);
    };

    return (
        <Marker
            position={[coche.lat, coche.lng]}
            icon={cocheIcon}
            eventHandlers={{ click: handleClick }}
        >
            <Popup>{coche.modelo}</Popup>
        </Marker>
    );
};

const CochesMapComponent = () => {
    const [cocheSeleccionado, setCocheSeleccionado] = useState<typeof coches[0] | null>(null);
    const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

    return (
        <div className="relative">
            <MapContainer
                center={center}
                zoom={14}
                style={{ height: "500px", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {coches.map((coche) => (
                    <ZoomOnClickMarker
                        key={coche.id}
                        coche={coche}
                        onSelect={(coche) => {
                            setCocheSeleccionado(coche);
                            setMostrarTarjeta(false);
                            setTimeout(() => setMostrarTarjeta(true), 1500); // espera al terminar el zoom
                        }}
                    />
                ))}

                {zonasParking.map((zona) => (
                    <Rectangle
                        key={zona.id}
                        bounds={zona.bounds as [[number, number], [number, number]]}
                        pathOptions={{ color: "green", weight: 2, fillOpacity: 0.2 }}
                    >
                        <Tooltip direction="top" offset={[0, 10]} opacity={1}>
                            {zona.nombre}
                        </Tooltip>
                    </Rectangle>
                ))}
            </MapContainer>

            {/* Tarjeta extendida*/}
            {mostrarTarjeta && cocheSeleccionado && (
                <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-xl w-80 transform transition-all scale-100 animate-grow z-[9999]">
                    <img
                        src={cocheSeleccionado.foto}
                        alt={cocheSeleccionado.modelo}
                        className="w-full h-36 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-bold mb-1">{cocheSeleccionado.modelo}</h2>
                    <p className="text-sm text-gray-500 mb-2">🔒 Seguro Básico · 🔋 514 km</p>

                    <div className="border-t border-gray-200 pt-2 text-sm">
                        <div className="flex justify-between mb-1">
                            <span>📅 14 Junio 2025</span>
                            <span>⏰ 09:00 → 12:00</span>
                        </div>
                        <p className="text-gray-600">📍 Parking RSM, Travessera de Dalt, 42</p>
                    </div>

                    <button className="mt-4 w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition">
                        Más detalles
                    </button>
                </div>
            )}
        </div>
    );
};

export default CochesMapComponent;
