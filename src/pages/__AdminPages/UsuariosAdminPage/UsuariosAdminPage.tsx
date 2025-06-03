import type { FC } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usuarioAdministrarVacio, type UsuarioAdministrar } from "../../../interfaces/Usuario";
import { ModalEditUserComponent } from "../../../components/Modal/ModalEditUserComponent/ModalEditUserComponent";
import { ModalConfirmDeleteUserComponent } from "../../../components/Modal/ModalConfirmDeleteUserCompoment/ModalConfirmDeleteUserComponent";
import { PaginacionComponent } from "../../../components/PaginacionComponent/PaginacionComponent";
import { createEmptyPage, type PageProps } from "../../../interfaces/PageProps";
import { httpGetTok, httpPatchTokSin } from "../../../utils/apiService";

export const UsuariosAdminPage: FC = () => {
    const { t } = useTranslation();
    const [usuarios, setUsuarios] = useState<PageProps<UsuarioAdministrar>>(createEmptyPage<UsuarioAdministrar>());
    const [userSelect, setUserSelect] = useState<UsuarioAdministrar>(usuarioAdministrarVacio);
    const [showUpdateUser, setShowUpdateUser] = useState<boolean>(false);
    const [showDeleteUser, setShowDeleteUser] = useState<boolean>(false);
    const [paginaActual, setPaginaActual] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    const peticionUsuairos = async () => {
        const response = await httpGetTok<PageProps<UsuarioAdministrar>>(
            `/usuarios?page=${paginaActual}&size=${pageSize}`
        );
        if (response) {
            setUsuarios(response);
            setPaginaActual(response.number);
        } else {
            console.error("Fallo al obtener los datos de la página", paginaActual);
        }
    };

    useEffect(() => {
        peticionUsuairos();
    }, [paginaActual, pageSize]);

    useEffect(() => {
        peticionUsuairos();
    }, []);

    const handleEditar = (usuario: UsuarioAdministrar) => {
        setUserSelect(usuario);
        setShowUpdateUser(true);
    };

    const handleEliminar = (usuario: UsuarioAdministrar) => {
        setUserSelect(usuario);
        setShowDeleteUser(true);
    };

    const handleAdmin = async (usuario: UsuarioAdministrar) => {
        await httpPatchTokSin(`/usuarios/admin/${usuario.id}`);
        peticionUsuairos();
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{t("adminUsers.title")}</h1>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg text-white">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left border-b border-white/10">
                                <th className="p-2">{t("adminUsers.table.username")}</th>
                                <th className="p-2">{t("adminUsers.table.email")}</th>
                                <th className="p-2">{t("adminUsers.table.status")}</th>
                                <th className="p-2">{t("adminUsers.table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.content.map((usuario) => (
                                <tr key={usuario.id} className="hover:bg-white/10 transition duration-200">
                                    <td className="p-2">{usuario.usuario}</td>
                                    <td className="p-2">{usuario.email}</td>
                                    <td className="p-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${!usuario.estaBloqueado
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                                }`}
                                        >
                                            {!usuario.estaBloqueado
                                                ? t("adminUsers.status.active")
                                                : t("adminUsers.status.blocked")}
                                        </span>
                                    </td>
                                    <td className="p-2 space-x-2">
                                        <button
                                            onClick={() => handleEditar(usuario)}
                                            className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            {t("adminUsers.actions.block")}
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(usuario)}
                                            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            {t("adminUsers.actions.delete")}
                                        </button>
                                        <button
                                            onClick={() => handleAdmin(usuario)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-xs"
                                        >
                                            {t("adminUsers.actions.makeAdmin")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {usuarios.content.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-400">
                                        {t("adminUsers.noUsers")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="mt-10 px-10 pb-20">
                        <PaginacionComponent
                            currentPage={paginaActual}
                            totalItems={usuarios.totalElements}
                            pageSize={pageSize}
                            onPageChange={(p) => setPaginaActual(p)}
                            onPageSizeChange={(s) => {
                                setPageSize(s);
                                setPaginaActual(0);
                            }}
                        />
                    </div>
                </div>
            </div>

            {showUpdateUser && (
                <ModalEditUserComponent
                    onClose={() => {
                        setShowUpdateUser(false);
                        peticionUsuairos();
                    }}
                    usuario={userSelect}
                />
            )}

            {showDeleteUser && (
                <ModalConfirmDeleteUserComponent
                    onClose={() => {
                        setShowDeleteUser(false);
                        peticionUsuairos();
                    }}
                    usuario={userSelect}
                />
            )}
        </>
    );
};
