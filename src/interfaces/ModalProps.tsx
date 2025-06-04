import type { NoticiaProps } from "./NoticiasProps";
import type { Parking } from "./Parking";
import type { DataPayment } from "./PaymentProps";
import type { UsuarioAdministrar } from "./Usuario";
import type { Vehiculo } from "./Vehiculo";

export interface ModalBaseProps {
  onClose: () => void;
  children: React.ReactNode;
  titulo: string;
  modoClaro?: boolean;
}


export interface ModalGestionUserProps {
  onClose: () => void;
  usuario: UsuarioAdministrar | null;
  modoClaro?:boolean;

}

export interface ModalCrearVehiculoProps {
  onClose: () => void;
  modoClaro?:boolean;

}

export interface ModalEditarVehiculoProps {
  vehiculo: Vehiculo;
  onClose: () => void;
  modoClaro?:boolean;

}

export interface ModalElimarVehiculoProps {
  vehiculo: Vehiculo;
  onClose: () => void;
  modoClaro?:boolean;

}

export interface ModalNoticiaProps {
  onClose: () => void;
  noticia?: NoticiaProps;
  modoClaro?:boolean;
}


export interface ModalParkingProps {
  onClose: () => void;
  parking: Parking;
  modoClaro?:boolean;

}

export interface ModalPayment {
  onClose: () => void;
  vehicle: Vehiculo;
  initialDuration?: number;
  onSubmit: (data: DataPayment) => void;
  modoClaro?:boolean;

}
export interface ModalReserva {
  onClose: () => void;
  vehiculo: Vehiculo;
  initialDuration?: number;
  modoClaro?:boolean;

}