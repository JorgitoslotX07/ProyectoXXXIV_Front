import type { FC } from "react";

export const SubCategoriasComponent: FC = () => {
  // datos falsos
  const noticiasMock = [
    {
      id: 1,
      titulo: "Turismo",
      imagen: "/public/turismoCat.jpeg",
    },
    {
      id: 2,
      titulo: "SUV",
      imagen: "/public/SUVCat2.jpeg",
    },
    {
      id: 3,
      titulo: "Monovolumen",
      imagen: "/public/monovolumen.webp",
    },
    {
      id: 4,
      titulo: "Micro Coche",
      imagen: "/public/microcoche.jpg",
    },
  ];

  return (
    <>
      <div className="px-10 py-12 text-white"> {/*bg-[#111827]  rounded-lg shadow-md*/}
        <h2 className="text-3xl font-bold mb-6 text-[#C4B5FD] text-center">
          Categorías | Tipo de Coche
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {noticiasMock.map((item) => (
            <div
              key={item.id}
              className="w-60 flex-shrink-0 rounded-lg p-4 shadow-lg text-center"
            > {/*bg-[#1F2937]*/}
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-full h-24 object-cover rounded mb-4"
              />

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
