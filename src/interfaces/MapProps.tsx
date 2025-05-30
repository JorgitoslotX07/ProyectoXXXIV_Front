import type { LatLngTuple } from "leaflet";

export interface MapEditorProps {
    onPolygonChange: (coords: [number, number][]) => void;
}

export interface MiniMapProps {
    polygon: LatLngTuple[];
}