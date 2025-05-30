import type { FC } from "react";
import type { ModalNoticiaProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";

export const  ModalNoticiasDelComponent: FC<ModalNoticiaProps> = ({ onClose, noticia }) => {
    function onConfirm() {
        
    }
    return (
      <ModalBaseComponent onClose={onClose} titulo="Eliminar Noticia">
        <p className="mb-4">¿Eliminar la noticia <strong>{noticia?.titulo}</strong>?</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 text-white">
            Eliminar
          </button>
        </div>
      </ModalBaseComponent>
    );
  }