export interface CarnetRequest {
    dni: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    fechaEmision: string;
    fechaCaducidad: string;
}

export interface CarnetResponse {
    usuarioId: number;
    imagenUrl: string;
    fechaSolicitud: string;
}