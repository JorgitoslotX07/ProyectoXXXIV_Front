export interface NoticiaProps {
    id: number;
    titulo: string;
    descripcion: string;
    contenido: string;
    imagen: string;
    fecha: string;
    autor: string;
    publicado: boolean;
}

export const NoticiaProps: NoticiaProps = {
    id: 0,
    titulo: "",
    descripcion: "",
    contenido: "",
    imagen: "",
    fecha: "",
    autor: "",
    publicado: false,
}