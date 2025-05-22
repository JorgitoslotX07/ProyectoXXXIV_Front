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
      <div className="px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Categorias | Tipo de Coche
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {noticiasMock.map((item) => (
            <div
              key={item.id}
              className="w-60 flex-shrink-0 rounded-lg p-4 text-center"
            >
              <div className="w-full h-24 bg-gray-200 rounded mb-2" />
              {/* aqui va una imagen, de momento hay una div para rellenar */}
              <p className="text-lg font-semibold text-gray-700">
                {item.titulo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
