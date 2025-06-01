// src/components/parkings/MapEditor.tsx
import { useRef, type FC } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import type { MapEditorProps } from "../../../interfaces/MapProps";
import type { LatLngTuple } from "leaflet";


export const MapEditorComponent: FC<MapEditorProps> = ({ onPolygonChange, initialPolygon }) => {
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  const _onCreated = (e: any) => {
    const layer = e.layer;
    if (layer instanceof L.Polygon) {
      const latlngs = (layer.getLatLngs()[0] as L.LatLng[]);
      const coords = latlngs.map((ll) => [ll.lat, ll.lng] as LatLngTuple);
      onPolygonChange(coords);
    }
  };

  const _onDeleted = () => {
    onPolygonChange([]);
  };

  const center = initialPolygon?.[0] ?? [40.4168, -3.7038];

  return (
    <MapContainer
      center={center}
      zoom={15}
      className="w-full h-[500px] rounded-xl shadow-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FeatureGroup ref={featureGroupRef}>
        {initialPolygon && initialPolygon.length > 2 && (
          <Polygon positions={initialPolygon} />
        )}
        <EditControl
          position="topright"
          onCreated={_onCreated}
          onDeleted={_onDeleted}
          draw={{
            circle: false,
            marker: false,
            polyline: false,
            rectangle: false,
            polygon: true,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};
