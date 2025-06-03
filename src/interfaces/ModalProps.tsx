import type { NoticiaProps } from "./NoticiasProps";
import type { Parking } from "./Parking";
import type { DataPayment } from "./PaymentProps";
import type { UsuarioAdministrar } from "./Usuario";
import type { Vehiculo } from "./Vehiculo";

export interface ModalBaseProps {
  onClose: () => void;
  children: React.ReactNode;
  titulo: string;
}


export interface ModalGestionUserProps {
  onClose: () => void;
  usuario: UsuarioAdministrar | null;
}

export interface ModalCrearVehiculoProps {
  onClose: () => void;
}

export interface ModalEditarVehiculoProps {
  vehiculo: Vehiculo;
  onClose: () => void;
}

export interface ModalElimarVehiculoProps {
  vehiculo: Vehiculo;
  onClose: () => void;
}

export interface ModalNoticiaProps {
  onClose: () => void;
  noticia?: NoticiaProps;
}


export interface ModalParkingProps {
  onClose: () => void;
  parking: Parking;
}

export interface ModalPayment {
  onClose: () => void;
  vehicle: Vehiculo;
  initialDuration?: number;
  onSubmit: (data: DataPayment) => void;
}