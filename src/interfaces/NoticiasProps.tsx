export interface NoticiaProps {
    id: number;
    titulo: string;
    descripcion: string;
    contenido: string;
    imagen: string;
    fecha: string;
    autor: string;
    idiomaCodigo: 'ESP' | 'ENG' | 'CAT',
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
    idiomaCodigo: "ESP",
    publicado: false,
}

export interface NoticiaCrearProps {
    id?: number;
    titulo: string;
    contenido: string;
    fecha: string;
    idiomaCodigo: 'ESP' | 'ENG' | 'CAT';
    usuario: string;
}

export const NoticiaCrearProps: NoticiaCrearProps = {
    titulo: "",
    contenido: "",
    fecha: new Date().toISOString(),
    idiomaCodigo: 'ESP',
    usuario: "admin",
}

export function conversorNoticia(noti: NoticiaProps, user: string): NoticiaCrearProps {
    console.log(noti)
    return {
        titulo: noti.titulo,
        contenido: noti.contenido,
        fecha: noti.fecha,
        idiomaCodigo: noti.idiomaCodigo,
        usuario: user,
    }
}