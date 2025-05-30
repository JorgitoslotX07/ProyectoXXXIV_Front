import { useState, type FC, useEffect } from "react";
import { usuarioAdministrarVacio, type UsuarioAdministrar } from "../../../interfaces/Usuario";
import { httpPut } from "../../../utils/apiService";
import type { ModalGestionUserProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";

export const ModalEditUserComponent: FC<ModalGestionUserProps> = ({ onClose, usuario }) => {
    const [formData, setFormData] = useState<UsuarioAdministrar>(usuarioAdministrarVacio);

    useEffect(() => {
        if (usuario) setFormData(usuario);
    }, [usuario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === value,
        }));
    };

    const onGuardar = async () => {
        // await httpPut("putUser", usuario);
        console.log("Update User", usuario)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGuardar();
        onClose();
    };

    return (
        <>
            <ModalBaseComponent onClose={onClose} titulo="Editar Usuario">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                    />
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="activo"
                            checked={formData.activo}
                            onChange={handleChange}
                        />
                        <span>Activo</span>
                    </label>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Guardar
                        </button>
                    </div>
                </form>
            </ModalBaseComponent>
        </>
    );
}