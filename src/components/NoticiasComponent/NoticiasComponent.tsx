import type { FC } from "react";

export const NoticiasComponent: FC = () => {

    // datos falsos
    const noticiasMock = [
        {
          id: 1,
          titulo: "Tecnología",
          imagen: "https://via.placeholder.com/150?text=Tech",
          descripcion: "Últimas novedades en IA y gadgets.",
        },
        {
          id: 2,
          titulo: "Política",
          imagen: "https://via.placeholder.com/150?text=Política",
          descripcion: "Análisis del panorama político actual.",
        },
        {
          id: 3,
          titulo: "Cultura",
          imagen: "https://via.placeholder.com/150?text=Cultura",
          descripcion: "Eventos culturales destacados.",
        },
        {
          id: 4,
          titulo: "Deportes",
          imagen: "https://via.placeholder.com/150?text=Deportes",
          descripcion: "Resultados y noticias deportivas.",
        },
        {
          id: 5,
          titulo: "Ciencia",
          imagen: "https://via.placeholder.com/150?text=Ciencia",
          descripcion: "Avances en investigación y descubrimientos.",
        }
      ];
      

  return (
    <>

    <div className="px-4">
        <h2 className="text-2xl font-semibold mb-4">Noticias</h2>
        
        {/* <div className="flex space-x-4 overflow-x-auto scrollbar-hide "> */}
        <div className="flex justify-center items-center gap-4 flex-wrap">  
            {noticiasMock.map((item) => (
                <div key={item.id} className="w-48 flex-shrink-0 bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-full h-24 bg-gray-200 rounded mb-2" />
                    {/* aqui va una imagen, de momento hay una div para rellenar */}
                    <p className="text-sm font-semibold text-gray-700">{item.titulo}</p>
                    <p className="text-xs text-gray-500">{item.descripcion}</p>
                </div>
            ))}
        </div>
    </div>

    </>
  );
};
