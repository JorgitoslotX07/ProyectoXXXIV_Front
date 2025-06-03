import { useState, type FC } from "react";
import type { ModalGestionUserProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import { httpPatchTok } from "../../../utils/apiService";

export const ModalEditUserComponent: FC<ModalGestionUserProps> = ({ onClose, usuario }) => {
    const [mensaje, setMensaje] = useState<string>("");

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await httpPatchTok(`/usuarios/bloquear/${usuario?.id}`, {mensaje})
        console.log(response)
        onClose();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setMensaje(e.target.value);
    };

    return (
        <>
            <ModalBaseComponent onClose={onClose} titulo="Editar Usuario">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-gray-700">
                        ¿Deseas banear al usuario?
                    </p>

                    <label className="flex items-center space-x-2">
                        <span>{usuario?.usuario}</span>
                    </label>

                    <textarea
                        name="motivo"
                        value={mensaje}
                        onChange={handleChange}
                        placeholder="Escribe el motivo del baneo"
                        required
                        className="w-full border p-2 rounded"
                        rows={3}
                    />

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded text-white "bg-red-600"
                                }`}
                        >
                            Banear
                        </button>
                    </div>
                </form>
            </ModalBaseComponent>
        </>
    );
}