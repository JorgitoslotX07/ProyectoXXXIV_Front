import { useEffect, useState, type FC, type ReactElement } from "react";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import type { ModalCrearVehiculoProps } from "../../../interfaces/ModalProps";

export const ModalAddUserComponent: FC<ModalCrearVehiculoProps> = ({ onClose }): ReactElement => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState<"usuario" | "admin">("usuario");
    const [activo, setActivo] = useState(true);

    useEffect(() => {
        setNombre("");
        setEmail("");
        setRol("usuario");
        setActivo(true);

    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //   onSave({ usuario: nombre, email, rol, activo, avatar: "", token: "" });
        onClose();
    };


    return (
        <ModalBaseComponent modoClaro onClose={onClose} titulo="Agregar Usuario">
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
                <div>
                    <label className="block mb-1">Nombre de usuario</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Rol</label>
                    <select
                        value={rol}
                        onChange={(e) => setRol(e.target.value as "usuario" | "admin")}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                    >
                        <option value="usuario">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        id="activo"
                        type="checkbox"
                        checked={activo}
                        onChange={() => setActivo((v) => !v)}
                        className="accent-green-500"
                    />
                    <label htmlFor="activo">Activo</label>
                </div>

                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">
                        Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 text-white">
                        Guardar
                    </button>
                </div>
            </form>
        </ModalBaseComponent>
    );
};
