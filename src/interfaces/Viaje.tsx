export interface Viaje {
  id: number;
  usuario: {
    id: number;
  };
  reserva: {
    id: number;
  };
  vehiculo: {
    id: number;
    marca: string;
    modelo: string;
  };
  fechaInicio: string;   
  fechaFin: string;       
  kmRecorridos: number;
  precio: number;      
}

export interface ViajeResumen {
  reservaId: number;
  marcaVehiculo: string;
  modeloVehiculo: string;
  fechaInicio: string;    
  fechaFin: string;      
  kmRecorridos: number;
  cods: {
    lat: number;
    lng: number;
  }[];
  precio: number;
}