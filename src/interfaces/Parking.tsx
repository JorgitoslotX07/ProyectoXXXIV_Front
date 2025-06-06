import type { LatLngTuple } from "leaflet";

export interface Parking {
  id: number;
  name: string;
  capacity: number;
  polygon: LatLngTuple[]
}

export const Parking = {
  id: 0,
  name: "",
  capacity: 0,
  polygon: []
}

export interface ParkingFormProps {
  polygon: LatLngTuple[];
  onSave: (data: { name: string; capacity: number; polygon:  LatLngTuple[] }) => void;
  modoClaro: boolean
}

