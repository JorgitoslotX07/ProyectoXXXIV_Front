import type { FC } from "react";
import { ModalBaseComponent } from "../../ModalBaseComponent/ModalBaseComponent";
import type { ModalElimarVehiculoProps } from "../../../interfaces/ModalProps";

export const ModalEliminarVehiculo: FC<ModalElimarVehiculoProps> = ({ vehiculo, onClose }) => {
    function onConfirmar() {
        
    }

    return (
    <ModalBaseComponent onClose = { onClose } titulo = "Eliminar Vehículo" >
      <p className="mb-6">¿Estás seguro de que deseas eliminar el vehículo <strong>{vehiculo.marca} {vehiculo.modelo}</strong>?</p>
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500">Cancelar</button>
        <button onClick={onConfirmar} className="px-4 py-2 rounded bg-red-600 hover:bg-red-500">Eliminar</button>
      </div>
    </ModalBaseComponent >)
}
