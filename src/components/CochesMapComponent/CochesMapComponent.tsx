import {
    MapContainer,
    TileLayer,
    Marker,
    // useMap
} from "react-leaflet";
import L, { Map as LeafletMap, type LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

interface UbicacionVehiculo {
    id: number;
    latitud: number;
    longitud: number;
}

interface DatosVehiculo {
    id: number;
    marca: string;
    modelo: string;
    imagen: string | null;
    kilometraje: number;
    ultimaRevision: string;
    autonomia: number;
    estado: string;
    latitud: number;
    longitud: number;
}

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
      </div>
    `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });
};

const ciudades = [
    { nombre: "Tarragona", coords: [41.1189, 1.2445] as LatLngTuple },
    { nombre: "Salou", coords: [41.077, 1.131] as LatLngTuple },
    { nombre: "Valls", coords: [41.2861, 1.2492] as LatLngTuple },
    { nombre: "Reus", coords: [41.1561, 1.1069] as LatLngTuple },
];

const CochesMapComponent = () => {
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(ciudades[0]);
    const [direccionDetectada, setDireccionDetectada] = useState<string | null>(null);
    const [ubicaciones, setUbicaciones] = useState<UbicacionVehiculo[]>([]);
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<DatosVehiculo | null>(null);
    const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
    const [posicionUsuario, setPosicionUsuario] = useState<LatLngTuple | null>(null);
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const coords: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
                setPosicionUsuario(coords);
                const ciudadCercana = ciudades.reduce((prev, curr) => {
                    const distPrev = Math.hypot(prev.coords[0] - coords[0], prev.coords[1] - coords[1]);
                    const distCurr = Math.hypot(curr.coords[0] - coords[0], curr.coords[1] - coords[1]);
                    return distCurr < distPrev ? curr : prev;
                });
                setCiudadSeleccionada(ciudadCercana);

                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`);
                    const data = await res.json();
                    setDireccionDetectada(data.display_name);
                } catch (err) {
                    console.warn("Error al obtener la dirección:", err);
                }
            },
            () => {
                console.warn("No se pudo obtener la ubicación del usuario.");
            }
        );

        fetch("http://192.168.198.105:8080/v1/vehiculos/ubicaciones")
            .then(res => res.json())
            .then(data => setUbicaciones(data))
            .catch(err => console.error("Error al cargar ubicaciones:", err));
    }, []);

    const handleClickVehiculo = async (id: number, coords: LatLngTuple) => {
        setMostrarTarjeta(false);
        setVehiculoSeleccionado(null);

        if (mapRef.current) {
            mapRef.current.flyTo(coords, 17, { duration: 1.2 });
        }

        try {
            const res = await fetch(`http://192.168.198.105:8080/v1/vehiculos/${id}`);
            const data = await res.json();
            setTimeout(() => {
                setVehiculoSeleccionado(data);
                setMostrarTarjeta(true);
            }, 400);
        } catch (err) {
            console.error("Error al obtener vehículo:", err);
        }
    };

    return (
        <div className="relative">
            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes fadein {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadein {
                    animation: fadein 0.4s ease-in-out;
                }
            `}</style>

            <div className="mb-2 flex justify-end pr-4 pt-2">
                <select
                    value={ciudadSeleccionada.nombre}
                    onChange={(e) => {
                        const ciudad = ciudades.find((c) => c.nombre === e.target.value);
                        if (ciudad) {
                            setCiudadSeleccionada(ciudad);
                            if (mapRef.current) {
                                mapRef.current.flyTo(ciudad.coords, 14, { duration: 1.5 });
                            }
                        }
                    }}
                    className="px-3 py-1 border rounded shadow"
                >
                    {ciudades.map((c) => (
                        <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
                    ))}
                </select>
            </div>

            <div className="px-4 pb-2 text-sm text-gray-700 font-semibold min-h-[1.5rem]">
                {direccionDetectada ? (
                    <>📍 Estás en: <span className="text-blue-600">{direccionDetectada}</span></>
                ) : posicionUsuario ? (
                    <span className="animate-pulse text-gray-500">📡 Detectando ubicación...</span>
                ) : null}
            </div>

            <MapContainer
                center={(posicionUsuario ?? ciudadSeleccionada.coords) as LatLngTuple}
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: "500px", width: "100%" }}
                ref={(ref) => {
                    if (ref && !mapRef.current) {
                        mapRef.current = ref;
                    }
                }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {ubicaciones.map((vehiculo) => (
                    <Marker
                        key={vehiculo.id}
                        position={[vehiculo.latitud, vehiculo.longitud] as LatLngTuple}
                        icon={crearIconoCoche(vehiculoSeleccionado?.id === vehiculo.id)}
                        eventHandlers={{
                            click: () => handleClickVehiculo(vehiculo.id, [vehiculo.latitud, vehiculo.longitud]),
                        }}
                    />
                ))}
            </MapContainer>

            {mostrarTarjeta && vehiculoSeleccionado && (
                <div className="absolute bottom-6 left-4 bg-white p-4 rounded-xl shadow-xl w-80 transform transition-all scale-100 animate-fadein z-[9999]">
                    <button
                        onClick={() => {
                            setVehiculoSeleccionado(null);
                            setMostrarTarjeta(false);
                        }}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
                    >
                        ✕
                    </button>
                    {vehiculoSeleccionado.imagen && (
                        <img
                            src={vehiculoSeleccionado.imagen}
                            alt={`${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`}
                            className="w-full h-36 object-cover rounded mb-4"
                        />
                    )}
                    <h2 className="text-xl font-bold mb-1">
                        {vehiculoSeleccionado.marca} {vehiculoSeleccionado.modelo}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                        🔋 {vehiculoSeleccionado.autonomia} km · 📅 Últ. revisión: {vehiculoSeleccionado.ultimaRevision}
                    </p>
                    <div className="border-t border-gray-200 pt-2 text-sm">
                        <p className="text-gray-600">🚗 Estado: {vehiculoSeleccionado.estado}</p>
                        <p className="text-gray-600">📍 Lat: {vehiculoSeleccionado.latitud}, Lng: {vehiculoSeleccionado.longitud}</p>
                    </div>
                    <button className="mt-4 w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition">
                        Más detalles
                    </button>
                </div>
            )}
        </div>
    );
};

export default CochesMapComponent;
