import type { FC } from "react";
import { httpDelete } from "../../../utils/apiService";
import type { ModalGestionUserProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../../ModalBaseComponent/ModalBaseComponent";


export const ModalConfirmDeleteUserComponent: FC<ModalGestionUserProps> = ({ isOpen, onClose, usuario }) => {
  const onConfirm = async () => {
    // await httpDelete("rutaDeleteUser" + usuario?.id);
    console.log("Delete User", usuario)

  }

  const handleSubmit = () => {
    onConfirm();
    onClose();
  };


  return (
    <>
      {isOpen &&
        <ModalBaseComponent onClose={onClose} titulo="Confirmar Eliminación">
          <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
          <p className="mb-4">¿Estás seguro de eliminar al usuario <strong>{usuario?.usuario}</strong>?</p>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancelar
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-red-600 text-white rounded">
              Eliminar
            </button>
          </div>
        </ModalBaseComponent>
      }
    </>
  );
}
