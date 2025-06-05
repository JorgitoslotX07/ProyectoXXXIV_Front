export interface Reserva {
  id: string;
  vehiculo: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

export interface ReservaDetalle {
  id: number;
  usuario: {
    id: number
  };
  viaje: {
    id: number;
  }
  vehiculo: {
    id: number;
    marca: string,
    modelo: string,
  }
  parkingRecogida: {
    id: number;
    name: string
  }
  fechaReserva: string;
  estado: "PENDIENTE" | "CONFIRMADA" | "CANCELADA" | "ACTIVA";
}