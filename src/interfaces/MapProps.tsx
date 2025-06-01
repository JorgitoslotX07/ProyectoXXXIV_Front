import type { LatLngTuple } from "leaflet";

export interface MapEditorProps {
    onPolygonChange: (coords: LatLngTuple[]) => void;
    initialPolygon?: LatLngTuple[];
}

export interface MiniMapProps {
    polygon: LatLngTuple[];
}