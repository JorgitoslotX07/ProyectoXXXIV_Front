import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, { Map as LeafletMap, type LatLngTuple } from "leaflet";
import type { MarkerCluster } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useRef, useState } from "react";
import type {
  DatosVehiculo,
  UbicacionVehiculo,
} from "../../interfaces/Vehiculo";

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
    iconSize: [40, 45],
    iconAnchor: [20, 45],
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
  const [direccionDetectada, setDireccionDetectada] = useState<string | null>(
    null
  );
  const [ubicaciones, setUbicaciones] = useState<UbicacionVehiculo[]>([]); // , setUbicaciones
  const [vehiculoSeleccionado, setVehiculoSeleccionado] =
    useState<DatosVehiculo | null>(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [posicionUsuario, setPosicionUsuario] = useState<LatLngTuple | null>(
    null
  );
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
        setPosicionUsuario(coords);
        const ciudadCercana = ciudades.reduce((prev, curr) => {
          const distPrev = Math.hypot(
            prev.coords[0] - coords[0],
            prev.coords[1] - coords[1]
          );
          const distCurr = Math.hypot(
            curr.coords[0] - coords[0],
            curr.coords[1] - coords[1]
          );
          return distCurr < distPrev ? curr : prev;
        });
        setCiudadSeleccionada(ciudadCercana);

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
      }
    );

    fetch("http://192.168.198.105:8080/v1/vehiculos/ubicaciones")
      .then((res) => res.json())
      .then((data) => setUbicaciones(data))
      .catch((err) => console.error("Error al cargar ubicaciones:", err));
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
      <div className="flex flex-wrap justify-between items-center gap-2 px-4 pt-2 pb-2">
        <div className="text-sm text-gray-700 font-semibold min-h-[1.5rem]">
          {direccionDetectada ? (
            <>
              📍 Estás en: <span className="text-blue-600">{direccionDetectada}</span>
            </>
          ) : posicionUsuario ? (
            <span className="animate-pulse text-gray-500">
              📡 Detectando ubicación...
            </span>
          ) : null}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[90rem] flex flex-wrap items-start gap-4 px-4">
        <div className="flex-1 min-w-[300px]">
          <MapContainer
            className="w-full h-[470px]"
            center={(posicionUsuario ?? ciudadSeleccionada.coords) as LatLngTuple}
            zoom={6} // ideal para ver España entera
            minZoom={6}
            maxZoom={17}
            scrollWheelZoom={true}
            maxBounds={[[44, -10], [35.5, 5]]} // norte-oeste a sur-este de España
            maxBoundsViscosity={1.0}
            ref={(ref) => {
              if (ref && !mapRef.current) {
                mapRef.current = ref;
              }
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" noWrap={true} />

            <MarkerClusterGroup
              chunkedLoading
              spiderfyOnMaxZoom
              zoomToBoundsOnClick
              showCoverageOnHover={false}
              iconCreateFunction={(cluster: MarkerCluster) => {
                const count = cluster.getChildCount();
                return L.divIcon({
                  html: `
                    <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                      <div style="
                        position: absolute;
                        top: -20px;
                        background: #3b82f6;
                        color: white;
                        font-size: 13px;
                        font-weight: bold;
                        padding: 2px 6px;
                        border-radius: 20px;
                        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
                      ">${count}</div>
                      <svg width="40" height="45" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(0,0)">
                          <path d="M20 0C9 0 0 9 0 20c0 11 10 21 20 25 10-4 20-14 20-25C40 9 31 0 20 0z" fill="#3b82f6" />
                          <circle cx="20" cy="20" r="15" fill="white"/>
                          <path d="M13 25v-2l1-4c.2-1 1-2 2-2h8c1 0 2 .7 2 2l1 4v2h-1a1 1 0 1 1-2 0h-8a1 1 0 1 1-2 0h-1zm3-6h8l-.5-2h-7l-.5 2z" fill="#3b82f6" />
                        </g>
                      </svg>
                    </div>
                  `,
                  className: "",
                  iconSize: [40, 45],
                  iconAnchor: [20, 45],
                });
              }}
            >
              {ubicaciones.map((vehiculo) => (
                <Marker
                  key={vehiculo.id}
                  position={[vehiculo.latitud, vehiculo.longitud] as LatLngTuple}
                  icon={crearIconoCoche(vehiculoSeleccionado?.id === vehiculo.id)}
                  eventHandlers={{
                    click: () =>
                      handleClickVehiculo(vehiculo.id, [
                        vehiculo.latitud,
                        vehiculo.longitud,
                      ]),
                  }}
                />
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="selector-ciudad" className="text-sm font-medium text-gray-600">
            🗺️ Filtrar por ciudad:
          </label>
          <select
            id="selector-ciudad"
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
            className="px-3 py-1 border rounded shadow text-sm"
          >
            {ciudades.map((c) => (
              <option key={c.nombre} value={c.nombre}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mostrarTarjeta && vehiculoSeleccionado && (
        <div className="absolute bottom-3 left-8 bg-white p-4 rounded-xl shadow-xl w-80 animate-fadein z-[9999]">
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
            <p className="text-gray-600">
              📍 Lat: {vehiculoSeleccionado.latitud}, Lng: {vehiculoSeleccionado.longitud}
            </p>
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
