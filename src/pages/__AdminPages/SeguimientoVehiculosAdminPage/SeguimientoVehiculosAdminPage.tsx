import { useState, type FC, useEffect } from "react";
import { type VehiculoPos } from "../../../interfaces/Vehiculo";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { httpGetTok } from "../../../utils/apiService";

// Componente auxiliar que mueve el view del mapa al recibir una nueva posición.
interface MapRecenterProps {
  position: [number, number] | null;
}

const MapRecenter: FC<MapRecenterProps> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      // Centra el mapa en la posición dada, manteniendo el zoom actual
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
};

export const SeguimientoVehiculosAdminPage: FC = () => {
  const [vehiculos, setVehiculos] = useState<VehiculoPos[]>([]);
  const [selected, setSelected] = useState<VehiculoPos | null>(null);
  const [livePos, setLivePos] = useState<[number, number][]>([]);

  async function peticionVehiculosEnUso() {
    try {
      const response = await httpGetTok<VehiculoPos[]>("/rutas/activas");
      if (response) {
        setVehiculos(response);
      }
    } catch (error) {
      console.log("Error => ", error);
    }
  }

  useEffect(() => {
    peticionVehiculosEnUso();
  }, []);

  useEffect(() => {
    if (selected) {
      const rutaPosiciones = selected.puntos.map(
        (p) => [p[0], p[1]] as [number, number]
      );
      setLivePos(rutaPosiciones);
    } else {
      setLivePos([]);
    }
  }, [selected]);

  // La posición que queremos centrar: si hay seleccionado y livePos, tomo el último punto.
  const recenterPosition: [number, number] | null =
    selected && livePos.length > 0
      ? livePos[livePos.length - 1]
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-white flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-1/4 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Vehículos</h2>
        <ul className="space-y-2">
          {vehiculos.map((v, index) => (
            <li
              key={index}
              onClick={() => setSelected(v)}
              className={`p-3 rounded-lg cursor-pointer transition hover:bg-white/10 ${
                selected?.id === v.id ? "bg-white/20" : ""
              }`}
            >
              <p className="font-medium">
                {v.marca} {v.modelo}
              </p>
              <p className="text-sm text-gray-300">ID: {v.id}</p>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Seguimiento de Vehículos</h1>
        <MapContainer
          center={recenterPosition ?? [41.1567, 1.1064]}
          zoom={13}
          className="flex-1 w-full rounded-2xl shadow-lg"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Este componente mueve el mapa cuando recenterPosition cambia */}
          <MapRecenter position={recenterPosition} />

          {vehiculos.map((v, index) => {
            const rutaPosiciones: [number, number][] = v.puntos;
            const ultimoPunto = rutaPosiciones[rutaPosiciones.length - 1];
            return (
              <Marker
                key={index}
                position={ultimoPunto}
                eventHandlers={{ click: () => setSelected(v) }}
              >
                <Popup>
                  {v.marca} {v.modelo}
                </Popup>
              </Marker>
            );
          })}

          {livePos.length > 1 && (
            // Muestra la ruta del vehículo seleccionado
            <Polyline
              positions={livePos}
              pathOptions={{ color: "#22c55e", weight: 4 }}
            />
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
                  Lat: {coord[0]}, Lng: {coord[1]}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
