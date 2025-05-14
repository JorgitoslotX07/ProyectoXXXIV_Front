import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Opcional: icono personalizado
const cocheIcon = new L.Icon({
    iconUrl: "/simbolomarcador.png", // Usa tu icono aquí
    iconSize: [40, 45],
    iconAnchor: [20, 40],
});

const center: [number, number] = [41.119072, 1.245370];

const coches = [
    { id: 1, modelo: "Tesla Model 3", lat: 41.124313, lng: 1.241537 }, 
    { id: 2, modelo: "Renault Zoe", lat: 41.121021, lng: 1.256092 },
    { id: 3, modelo: "Fiat 500e", lat: 41.121211, lng: 1.256069 },
];

const CochesMapComponent = () => {
    return (
        <MapContainer center={center} zoom={14} style={{ height: "500px", width: "100%" }}
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />

            {coches.map((coche) => (
                <Marker
                    key={coche.id}
                    position={[coche.lat, coche.lng]}
                    icon={cocheIcon}
                >
                    <Popup>{coche.modelo}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default CochesMapComponent;
