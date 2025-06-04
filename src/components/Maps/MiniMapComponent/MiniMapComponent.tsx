import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { FC } from "react";
import type { MiniMapProps } from "../../../interfaces/MapProps";
import type { LatLngTuple } from "leaflet";




export const MiniMap: FC<MiniMapProps> = ({ polygon }) => {
  const center: LatLngTuple = polygon.length ? polygon[0] : [0, 0];
  return (
    <div className="h-32 w-48 rounded-lg overflow-hidden border border-white/10">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {polygon.length > 0 && (
          <Polygon positions={polygon} pathOptions={{ color: "#3b82f6", fillOpacity: 0.2 }} />
        )}
      </MapContainer>
    </div>
  );
}
