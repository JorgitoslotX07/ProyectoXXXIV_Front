import type { FC } from "react";
import { useEffect, useState } from "react";
import { usuarioAdministrarVacio, type UsuarioAdministrar } from "../../../interfaces/Usuario";
import { ModalEditUserComponent } from "../../../components/Modal/ModalEditUserComponent/ModalEditUserComponent";
import { ModalConfirmDeleteUserComponent } from "../../../components/Modal/ModalConfirmDeleteUserCompoment/ModalConfirmDeleteUserComponent";
import { BotonAgregarComponent } from "../../../components/__Admin/BotonAgregarComponent/BotonAgregarComponent";
import { ModalAddUserComponent } from "../../../components/Modal/ModalAddUserComponent/ModalAddUserComponent";

const mockUsuarios: UsuarioAdministrar[] = [
    {
        id: 1,
        usuario: "Juan_85",
        nombre: "Juan",
        apellidos: "Pérez",
        email: "juan@example.com",
        activo: true,
    },
    {
        id: 2,
        usuario: "MarGar",
        nombre: "María",
        apellidos: "García",
        email: "maria@example.com",
        activo: false,
    },
];

export const UsuariosAdminPage: FC = () => {
    const [usuarios, setUsuarios] = useState<UsuarioAdministrar[]>(mockUsuarios);
    const [showUpdateUser, setShowUpdateUser] = useState<boolean>(false);
    const [showDeleteUser, setShowDeleteUser] = useState<boolean>(false);
    const [showAddUser, setShowAddUser] = useState<boolean>(false);
    const [userSelect, setUserSelect] = useState<UsuarioAdministrar>(usuarioAdministrarVacio)

    useEffect(() => {
        // setUsuarios

        // peticion por los usuarios de back
    }, []);

    const handleEditar = (usuario: UsuarioAdministrar) => {
        // console.log("Editar usuario", usuario);
        setUserSelect(usuario)
        setShowUpdateUser(true);
    };

    const handleEliminar = (usuario: UsuarioAdministrar) => {
        setUserSelect(usuario)
        setShowDeleteUser(true);
    };

    const handleAgregar = () => {
        setShowAddUser(true);

    }

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Vehículos</h1>
                <BotonAgregarComponent text={"Añadir Vehiculo"} onClick={handleAgregar} />
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg text-white">

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left border-b border-white/10">
                                <th className="p-2">Usuario</th>
                                <th className="p-2">Nombre</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Estado</th>
                                <th className="p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr
                                    key={usuario.id}
                                    className="hover:bg-white/10 transition duration-200"
                                >
                                    <td className="p-2">{usuario.usuario}</td>
                                    <td className="p-2">{usuario.nombre + " " + usuario.apellidos}</td>
                                    <td className="p-2">{usuario.email}</td>
                                    <td className="p-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${usuario.activo ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                                }`}
                                        >
                                            {usuario.activo ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="p-2 space-x-2">
                                        <button
                                            onClick={() => handleEditar(usuario)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(usuario)}
                                            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {usuarios.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-400">
                                        No hay usuarios registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


            </div>

            {showAddUser && (
                <ModalAddUserComponent onClose={() => setShowAddUser(false)}/>
            )}
            {showUpdateUser && (
                <ModalEditUserComponent onClose={() => setShowUpdateUser(false)} usuario={userSelect} />
            )}
            {showDeleteUser && (
                <ModalConfirmDeleteUserComponent onClose={() => setShowDeleteUser(false)} usuario={userSelect} />
            )}

        </>
    );
}