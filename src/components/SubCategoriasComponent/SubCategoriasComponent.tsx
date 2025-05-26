import type { FC } from "react";

export const SubCategoriasComponent: FC = () => {
  // datos falsos
  const noticiasMock = [
    {
      id: 1,
      titulo: "Turismo",
      imagen: "/public/turismo.png",
    },
    {
      id: 2,
      titulo: "SUV",
      imagen: "https://via.placeholder.com/150?text=Política",
    },
    {
      id: 3,
      titulo: "Monovolumen",
      imagen: "https://via.placeholder.com/150?text=Cultura",
    },
    {
      id: 4,
      titulo: "Micro Coche",
      imagen: "https://via.placeholder.com/150?text=Deportes",
    },
  ];

  return (
    <>
  <div className="px-10 py-12 bg-[#111827] text-white rounded-lg shadow-md">
    <h2 className="text-3xl font-bold mb-6 text-[#C4B5FD] text-center">
      Categorías | Tipo de Coche
    </h2>

    <div className="flex flex-wrap justify-center gap-6">
      {noticiasMock.map((item) => (
        <div
          key={item.id}
          className="w-60 flex-shrink-0 rounded-lg p-4 bg-[#1F2937] shadow-lg text-center"
        >
          <div className="w-full h-24 bg-gray-600 rounded mb-4" />
          {/* Imagen de relleno */}
          <p className="text-lg font-semibold text-[#A7F3D0]">
            {item.titulo}
          </p>
        </div>
      ))}
    </div>
  </div>
</>

  );
};
