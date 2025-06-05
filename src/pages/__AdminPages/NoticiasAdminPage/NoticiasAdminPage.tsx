import { useState, type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { NoticiaProps } from "../../../interfaces/NoticiasProps";
import { BotonAgregarComponent } from "../../../components/__Admin/BotonAgregarComponent/BotonAgregarComponent";
import { ModalNoticiasAddEditComponent } from "../../../components/Modal/ModalNoticiasAddEditComponent/ModalNoticiasAddEditComponent";
import { ModalNoticiasDelComponent } from "../../../components/Modal/ModalNoticiasDelComponent/ModalNoticiasDelComponent";
import { createEmptyPage, type PageProps } from "../../../interfaces/PageProps";
import { httpGetTok } from "../../../utils/apiService";
import { PaginacionComponent } from "../../../components/PaginacionComponent/PaginacionComponent";
import { useThemeContext } from "../../../context/ThemeContext"; // ✅ modo claro/oscuro

export const NoticiasAdminPage: FC = () => {
    const { t } = useTranslation();
    const { modoClaro } = useThemeContext(); // ✅

    const [noticias, setNoticias] = useState<PageProps<NoticiaProps>>(
        createEmptyPage<NoticiaProps>()
    );
    const [selected, setSelected] = useState<NoticiaProps | null>(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDel, setShowModalDel] = useState(false);
    const [paginaActual, setPaginaActual] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    const peticionNoticias = async () => {
        const response = await httpGetTok<PageProps<NoticiaProps>>(
            `/noticias?page=${paginaActual}&size=${pageSize}`
        );
        if (response) {
            console.log(response)
            setNoticias(response);
            setPaginaActual(response.number);
        }
    };

    useEffect(() => {
        peticionNoticias();
    }, [paginaActual, pageSize]);

    useEffect(() => {
        peticionNoticias();
    }, []);

    const handleAgregar = () => {
        setSelected(null);
        setShowModalEdit(true);
    };
    const handleEdit = (n: NoticiaProps) => {
        setSelected(n);
        setShowModalEdit(true);
    };
    const handleDelete = (n: NoticiaProps) => {
        setSelected(n);
        setShowModalDel(true);
    };

    return (
        <div
            className={`min-h-screen p-8 transition-all duration-300 ${modoClaro
                    ? "bg-yellow-50 text-gray-800"
                    : "bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"
                }`}
        >
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{t("admin.news.title")}</h1>
                    <BotonAgregarComponent
                        text={t("admin.news.addButton")}
                        onClick={handleAgregar}
                    />
                </div>

                <div
                    className={`overflow-x-auto backdrop-blur-md rounded-2xl p-4 border ${modoClaro ? "bg-white border-gray-300" : "bg-white/5 border-white/10"
                        }`}
                >
                    <table className="min-w-full text-sm text-left">
                        <thead
                            className={`${modoClaro
                                    ? "text-gray-700 border-b border-gray-300"
                                    : "text-gray-300 border-b border-white/10"
                                }`}
                        >
                            <tr>
                                <th className="px-3 py-2">{t("admin.news.table.title")}</th>
                                <th className="px-3 py-2">{t("admin.news.table.date")}</th>
                                <th className="px-3 py-2">{t("admin.news.table.published")}</th>
                                <th className="px-3 py-2">{t("admin.news.table.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.content.map((n) => (
                                <tr
                                    key={n.id}
                                    className={`border-t transition ${modoClaro
                                            ? "border-gray-200 hover:bg-yellow-50"
                                            : "border-white/10 hover:bg-white/5"
                                        }`}
                                >
                                    <td className="px-3 py-2">{n.titulo}</td>
                                    <td className="px-3 py-2">
                                        {new Date(n.fecha).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${n.publicado
                                                    ? "bg-green-500/20 text-green-500"
                                                    : "bg-red-500/20 text-red-500"
                                                }`}
                                        >
                                            {n.publicado
                                                ? t("admin.news.status.yes")
                                                : t("admin.news.status.no")}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(n)}
                                            className="text-blue-500 hover:underline text-xs"
                                        >
                                            {t("admin.news.actions.edit")}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(n)}
                                            className="text-red-500 hover:underline text-xs"
                                        >
                                            {t("admin.news.actions.delete")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-10 px-10 pb-20">
                        <PaginacionComponent modoClaro={modoClaro}   
                            currentPage={paginaActual}
                            totalItems={noticias.totalElements}
                            pageSize={pageSize}
                            onPageChange={(p) => setPaginaActual(p)}
                            onPageSizeChange={(s) => {
                                setPageSize(s);
                                setPaginaActual(0);
                            } }                      />
                    </div>
                </div>
            </div>

            {showModalEdit && (
                <ModalNoticiasAddEditComponent
                    onClose={() => {
                        setShowModalEdit(false);
                        peticionNoticias();
                    }}
                    noticia={selected || undefined}
                />
            )}
            {showModalDel && (
                <ModalNoticiasDelComponent
                    onClose={() => {
                        setShowModalDel(false);
                        peticionNoticias();
                    }}
                    noticia={selected || undefined}
                    modoClaro={modoClaro}
                />
            )}
        </div>
    );
};
