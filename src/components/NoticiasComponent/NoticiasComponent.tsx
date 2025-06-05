import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { httpGetTok } from "../../utils/apiService";
import { NoticiaProps } from "../../interfaces/NoticiasProps";
import { createEmptyPage, type PageProps } from "../../interfaces/PageProps";
import type { ModoClaroProps } from "../../interfaces/ModoClaroProps";
interface Props extends ModoClaroProps {
  size: number;
}

export const NoticiasComponent: FC<Props> = ({ size, modoClaro }) => {
  const [noticias, setNoticias] = useState<PageProps<NoticiaProps>>(
    createEmptyPage<NoticiaProps>()
  );

  const peticionNoticias = async () => {
    const response = await httpGetTok<PageProps<NoticiaProps>>(
      `/noticias?page=0&size=${size}`
    );
    if (response) {
      setNoticias(response);
    } else {
      console.error("Fallo al obtener los datos de la página");
    }
  };

  useEffect(() => {
    peticionNoticias();
  }, []);

  const navigate = useNavigate();
  const verNoticia = (noticia: NoticiaProps) => {
    navigate("/noticia", { state: noticia });
  };

  return (
    <div className="px-4">
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {noticias.content.map((item) => (
          <div
            key={item.id}
            onClick={() => verNoticia(item)}

            className={`cursor-pointer flex-shrink-0 rounded-2xl p-4 text-center shadow-lg hover:shadow-md transition-all duration-300 flex flex-col justify-between h-55 w-55 ${modoClaro
                ? "bg-[#FFFBEA] text-[#444] border border-yellow-300"
                : "bg-[#1F2937] text-white"
              }`}
          >
            <img
              src={item.imagen}
              alt={item.titulo}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <p
              className={`text-sm font-semibold ${modoClaro ? "text-gray-700" : "text-gray-200"
                }`}
            >
              {item.titulo}
            </p>
            <p
              className={`text-xs ${modoClaro ? "text-gray-500" : "text-gray-400"
                }`}
            >
              {item.descripcion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};