import {
    MapContainer,
    TileLayer,
    Popup,
    Rectangle,
    Tooltip,
    useMap,
    Marker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const crearIconoCoche = (esSeleccionado: boolean) => {
    const color = esSeleccionado ? "#4ade80" : "#3b82f6";
    const extraStyle = esSeleccionado ? "animation: bounce 0.6s ease;" : "";

    return L.divIcon({
        className: "",
        html: `
      <div style="${extraStyle}">
<svg width="40" height="45" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0,0)">
          <path d="M20 0C9 0 0 9 0 20c0 11 10 21 20 25 10-4 20-14 20-25C40 9 31 0 20 0z" fill="${color}" />
          <circle cx="20" cy="20" r="15" fill="white"/>
          <path d="M13 25v-2l1-4c.2-1 1-2 2-2h8c1 0 2 .7 2 2l1 4v2h-1a1 1 0 1 1-2 0h-8a1 1 0 1 1-2 0h-1zm3-6h8l-.5-2h-7l-.5 2z" fill="${color}" />
        </g>
      </svg>
    `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });
};

const ciudades = [
    { nombre: "Tarragona", coords: [41.1189, 1.2445] },
    { nombre: "Salou", coords: [41.077, 1.131] },
    { nombre: "Valls", coords: [41.2861, 1.2492] },
    { nombre: "Reus", coords: [41.1561, 1.1069] },
];

const coches = [
    { id: 1, ciudad: "Tarragona", modelo: "Tesla Model 3", foto: "/TeslaModel3.png", lat: 41.124313, lng: 1.241537 },
    { id: 2, ciudad: "Salou", modelo: "Renault Zoe", foto: "/RenaultZoeE.png", lat: 41.0758, lng: 1.1321 },
    { id: 3, ciudad: "Valls", modelo: "Fiat 500e", foto: "/Fiat500e.png", lat: 41.287, lng: 1.248 },
    { id: 4, ciudad: "Reus", modelo: "Ford Capri E", foto: "/FordCapriE.png", lat: 41.1569, lng: 1.1061 },
];

const zonasParking = [
    {
        id: 1,
        nombre: "Parking Estación",
        foto: "/parking_layout_img.png",
        bounds: [
            [41.1235, 1.239],
            [41.1245, 1.242],
        ],
    },
    {
        id: 2,
        nombre: "Parking Centro Comercial",
        foto: "/parking-centro.jpg",
        bounds: [
            [41.1205, 1.254],
            [41.1215, 1.257],
        ],
    },
];

const FlyToCiudad = ({ coords, enabled }: { coords: [number, number]; enabled: boolean }) => {
    const map = useMap();
    useEffect(() => {
        if (!enabled) return;
        map.flyTo(map.getCenter(), 8, { duration: 2 });
        setTimeout(() => {
            map.flyTo(coords, 14, { duration: 2 });
        }, 1000);
    }, [coords, enabled, map]);
    return null;
};

const ZoomOnClickMarker = ({
    coche,
    cocheSeleccionado,
    onSelect,
}: {
    coche: typeof coches[0];
    cocheSeleccionado: typeof coches[0] | null;
    onSelect: (coche: typeof coches[0]) => void;
}) => {
    const map = useMap();
    const handleClick = () => {
        map.flyTo([coche.lat, coche.lng], 17, { duration: 1.5 });
        onSelect(coche);
    };
    const esSeleccionado = cocheSeleccionado?.id === coche.id;
    return (
        <Marker
            position={[coche.lat, coche.lng]}
            icon={crearIconoCoche(esSeleccionado)}
            eventHandlers={{ click: handleClick }}
        >
            <Popup>{coche.modelo}</Popup>
        </Marker>
    );
};

const CochesMapComponent = () => {
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(ciudades[0]);
    const [animarVuelo, setAnimarVuelo] = useState(false);
    const [cocheSeleccionado, setCocheSeleccionado] = useState<typeof coches[0] | null>(null);
    const [parkingSeleccionado, setParkingSeleccionado] = useState<typeof zonasParking[0] | null>(null);
    const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
    const [posicionUsuario, setPosicionUsuario] = useState<[number, number] | null>(null);
    const [direccionDetectada, setDireccionDetectada] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
                setPosicionUsuario(coords);
                const ciudadCercana = ciudades.reduce((prev, curr) => {
                    const distPrev = Math.hypot(prev.coords[0] - coords[0], prev.coords[1] - coords[1]);
                    const distCurr = Math.hypot(curr.coords[0] - coords[0], curr.coords[1] - coords[1]);
                    return distCurr < distPrev ? curr : prev;
                });
                setCiudadSeleccionada(ciudadCercana);
                setAnimarVuelo(true);
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
                    );
                    const data = await res.json();
                    setDireccionDetectada(data.display_name);
                } catch (err) {
                    console.warn("Error al obtener la dirección:", err);
                }
            },
            () => {
                console.warn("No se pudo obtener la ubicación del usuario.");
                setPosicionUsuario(null);
            }
        );
    }, []);

    return (
        <div className="relative">
            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-fadein {
                    animation: fadein 0.5s ease-in-out;
                }
                @keyframes fadein {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="mb-2 flex justify-end pr-4 pt-2">
                <select
                    value={ciudadSeleccionada.nombre}
                    onChange={(e) => {
                        const ciudad = ciudades.find((c) => c.nombre === e.target.value);
                        if (ciudad) {
                            setCiudadSeleccionada(ciudad);
                            setAnimarVuelo(true);
                        }
                    }}
                    className="px-3 py-1 border rounded shadow"
                >
                    {ciudades.map((c) => (
                        <option key={c.nombre} value={c.nombre}>
                            {c.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="px-4 pb-2 text-sm text-gray-700 font-semibold min-h-[1.5rem]">
                {direccionDetectada ? (
                    <>
                        📍 Estás en: <span className="text-blue-600">{direccionDetectada}</span>
                    </>
                ) : posicionUsuario ? (
                    <span className="animate-pulse text-gray-500">📡 Detectando ubicación...</span>
                ) : null}
            </div>

            <MapContainer
                center={(posicionUsuario ?? ciudadSeleccionada.coords) as [number, number]}
                zoom={14}
                style={{ height: "500px", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <FlyToCiudad coords={ciudadSeleccionada.coords as [number, number]} enabled={animarVuelo} />

                {coches.map((coche) => (
                    <ZoomOnClickMarker
                        key={coche.id}
                        coche={coche}
                        cocheSeleccionado={cocheSeleccionado}
                        onSelect={(coche) => {
                            setMostrarTarjeta(false);
                            setParkingSeleccionado(null);
                            setCocheSeleccionado(coche);
                            setTimeout(() => {
                                setMostrarTarjeta(true);
                            }, 300);
                        }}
                    />
                ))}

                {ciudadSeleccionada.nombre === "Tarragona" &&
                    zonasParking.map((zona) => (
                        <Rectangle
                            key={zona.id}
                            bounds={zona.bounds as [[number, number], [number, number]]}
                            pathOptions={{ color: "green", weight: 2, fillOpacity: 0.2 }}
                            eventHandlers={{
                                click: () => {
                                    setParkingSeleccionado(zona);
                                    setCocheSeleccionado(null);
                                    setMostrarTarjeta(false);
                                    setTimeout(() => setMostrarTarjeta(true), 500);
                                },
                            }}
                        >
                            <Tooltip direction="top" offset={[0, 10]} opacity={1}>
                                {zona.nombre}
                            </Tooltip>
                        </Rectangle>
                    ))}
            </MapContainer>

            {mostrarTarjeta && cocheSeleccionado && (
                <div className="absolute bottom-6 left-4 bg-white p-4 rounded-xl shadow-xl w-80 transform transition-all scale-100 animate-fadein z-[9999]">
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

            {mostrarTarjeta && parkingSeleccionado && (
                <div className="absolute bottom-6 left-4 bg-white p-4 rounded-xl shadow-xl w-80 transform transition-all scale-100 animate-fadein z-[9999]">
                    <img
                        src={parkingSeleccionado.foto}
                        alt={parkingSeleccionado.nombre}
                        className="w-full h-36 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-bold mb-1">{parkingSeleccionado.nombre}</h2>
                    <p className="text-sm text-gray-500 mb-2">🅿️ Zona de Aparcamiento</p>
                    <div className="border-t border-gray-200 pt-2 text-sm">
                        <p className="text-gray-600">📍 Parking RSM, Travessera de Dalt, 42</p>
                    </div>
                    <button className="mt-4 w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition">
                        Disponibilidad de Vehículos
                    </button>
                </div>
            )}
        </div>
    );
};

export default CochesMapComponent;
