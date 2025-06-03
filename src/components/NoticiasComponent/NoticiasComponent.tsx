import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { httpGetTok } from "../../utils/apiService";
import { NoticiaProps } from "../../interfaces/NoticiasProps";
import { createEmptyPage, type PageProps } from "../../interfaces/PageProps";

export const NoticiasComponent: FC<{ size: number }> = ({ size }) => {
  const [noticias, setNoticias] = useState<PageProps<NoticiaProps>>(
    createEmptyPage<NoticiaProps>()
  );

  const peticionNoticias = async () => {
    const response = await httpGetTok<PageProps<NoticiaProps>>(
      `/noticias?page=0&size=${size}`
    );
    if (response) {
      setNoticias(response);
      console.log(response);
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
            className="cursor-pointer w-48 flex-shrink-0 bg-gray-100 rounded-lg p-4 text-center shadow hover:shadow-md transition"
          >
            <img
              src={item.imagen}
              alt={item.titulo}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">{item.titulo}</p>
            <p className="text-xs text-gray-500">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
