
export interface ProductoProps {
    id: number;
    name: string;
    description: string;
    price: number;
    calificaiones: Array<number>;
    caracteristicas: Array<string>;
    imageUrl: string;
}