import { useEffect, useState, type FC } from "react";
import { httpGetImageTok } from "../../../utils/apiService";
import type { ImagenCarnetProps } from "../../../interfaces/ImagenCarnetProps";

export const ImagenCarnet: FC<ImagenCarnetProps> = ({ ruta, modoClaro, nombre }) => {
    const [urlBlob, setUrlBlob] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function peticionImg() {
        const response = await httpGetImageTok(ruta)
        if (response) {
            setUrlBlob(response)
        } else {
            setError("Error Al recibir la Imagen")
        }
    }

    useEffect(() => {
        peticionImg()
    }, [ruta]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!urlBlob) {
        return <p>Cargando imagen...</p>;
    }

    return (
        <img
        src={urlBlob}
        alt={`Carnet de ${nombre}`}
        loading="lazy"
        className={`w-full h-auto rounded-lg border ${modoClaro ? "border-gray-300" : "border-white/20"
          } object-cover`}
      />
    );
}
