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


export const viajeInicial: Viaje = {
  id: 0,
  usuario: {
    id: 0,
  },
  reserva: {
    id: 0,
  },
  vehiculo: {
    id: 0,
    marca: "",
    modelo: "",
  },
  fechaInicio: "",
  fechaFin: "",
  kmRecorridos: 0,
  precio: 0,
};


export const viajeResumenInicial: ViajeResumen = {
  reservaId: 0,
  marcaVehiculo: "",
  modeloVehiculo: "",
  fechaInicio: "",
  fechaFin: "",
  kmRecorridos: 0,
  cods: [],  
  precio: 0,
};
