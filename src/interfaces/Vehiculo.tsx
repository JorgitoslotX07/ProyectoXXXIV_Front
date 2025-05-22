export interface DatosVehiculo {
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

export interface UbicacionVehiculo {
  id: number;
  latitud: number;
  longitud: number;
}

export interface Vehiculo extends DatosVehiculo {
  localidad: string;
}
