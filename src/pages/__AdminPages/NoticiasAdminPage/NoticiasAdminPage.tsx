import { useState, type FC, useEffect } from "react";
import type { NoticiaProps } from "../../../interfaces/NoticiasProps";
import { BotonAgregarComponent } from "../../../components/__Admin/BotonAgregarComponent/BotonAgregarComponent";
import { ModalNoticiasAddEditComponent } from "../../../components/Modal/ModalNoticiasAddEditComponent/ModalNoticiasAddEditComponent";
import { ModalNoticiasDelComponent } from "../../../components/Modal/ModalNoticiasDelComponent/ModalNoticiasDelComponent";
import { createEmptyPage, type PageProps } from "../../../interfaces/PageProps";
import { httpGetTok } from "../../../utils/apiService";
import { PaginacionComponent } from "../../../components/PaginacionComponent/PaginacionComponent";

export const NoticiasAdminPage: FC = () => {
    // const [noticias, setNoticias] = useState<NoticiaProps[]>(noticiasMock);
    const [noticias, setNoticias] = useState<PageProps<NoticiaProps>>(createEmptyPage<NoticiaProps>());
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
            setNoticias(response);
            console.log(response)
            setPaginaActual(response.number);
        } else {
            console.error("Fallo al obtener los datos de la página", paginaActual);
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
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 text-white">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Gestión de Noticias</h1>
                    <BotonAgregarComponent text="Agregar Noticia" onClick={handleAgregar} />
                </div>
                <div className="overflow-x-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                    <table className="min-w-full text-sm text-left">
                        <thead className="text-gray-300 border-b border-white/10">
                            <tr>
                                <th className="px-3 py-2">Título</th>
                                <th className="px-3 py-2">Fecha</th>
                                <th className="px-3 py-2">Publicado</th>
                                <th className="px-3 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.content.map((n) => (
                                <tr key={n.id} className="border-t border-white/10 hover:bg-white/5 transition">
                                    <td className="px-3 py-2">{n.titulo}</td>
                                    <td className="px-3 py-2">{new Date(n.fecha).toLocaleDateString()}</td>
                                    <td className="px-3 py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${n.publicado ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {n.publicado ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 space-x-2">
                                        <button onClick={() => handleEdit(n)} className="text-blue-400 hover:underline text-xs">Editar</button>
                                        <button onClick={() => handleDelete(n)} className="text-red-400 hover:underline text-xs">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-10 px-10 pb-20">
                        <PaginacionComponent
                            currentPage={paginaActual}
                            totalItems={noticias.totalElements}
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

            {showModalEdit &&
                <ModalNoticiasAddEditComponent onClose={() => {setShowModalEdit(false); peticionNoticias();}} noticia={selected || undefined} />
            }
            {showModalDel && (
                <ModalNoticiasDelComponent onClose={() => {setShowModalDel(false); peticionNoticias();}} noticia={selected || undefined} />
            )}
        </div>
    );
}