export interface Reserva {
    id: string;
    vehiculo: string;
    fechaInicio: string;
    fechaFin: string;
    estado: string;
  }

  export interface ReservaDetalle {
    id: number;
    usuarioId: number;
    viajeId: number;
    fechaInicioViaje: string;    // "YYYY-MM-DD" o null
    fechaFinViaje: string | null;
    kmRecorridosViaje: number | null;
    vehiculoId: number;
    vehiculoMarca: string;
    vehiculoModelo: string;
    parkingRecogidaId: number;
    parkingRecogidaNombre: string;
    parkingDevolucionId: number;
    parkingDevolucionNombre: string;
    fechaReserva: string;        // ISO 8601 completo
    estado: "PENDIENTE" | "CONFIRMADA" | "CANCELADA" | "ACTIVA"; 
  }