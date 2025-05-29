import type { FC } from "react";

interface SubCategoriasProps {
  onFilterSelect: (tipo: string) => void;
}

export const SubCategoriasComponent: FC<SubCategoriasProps> = ({ onFilterSelect }) => {
  const categorias = [
    {
      id: 1,
      titulo: "Turismo",
      imagen: "/public/turismoCat.jpeg",
      descripcion: "Vehículos cómodos y eficientes ideales para carretera y ciudad.",
    },
    {
      id: 2,
      titulo: "SUV",
      imagen: "/public/SUVCat2.jpeg",
      descripcion: "Potencia y espacio, perfectos para aventuras y terrenos variados.",
    },
    {
      id: 3,
      titulo: "Monovolumen",
      imagen: "/public/monovolumen.webp",
      descripcion: "Gran capacidad interior para viajes en familia o con mucho equipaje.",
    },
    {
      id: 4,
      titulo: "Biplaza",
      imagen: "/public/microcoche.jpg",
      descripcion: "Compactos, ágiles y perfectos para el tráfico urbano.",
    },
  ];

  return (
    <div className="px-10 py-12 text-white">
      <h2 className="text-3xl font-bold mb-6 text-[#C4B5FD] text-center">
        Categorías | Tipo de Coche
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {categorias.map((item) => (
          <div
            key={item.id}
            onClick={() => onFilterSelect(item.titulo.toUpperCase())}
            className="bg-[#162947] cursor-pointer transition-transform transform hover:scale-[1.03] hover:shadow-2xl duration-300 ease-in-out
            [background-image:radial-gradient(at_47%_33%,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)]
            w-60 flex-shrink-0 rounded-lg p-4 shadow-lg text-center"
          >
            <img
              src={item.imagen}
              alt={item.titulo}
              className="w-full h-24 object-cover rounded mb-4"
            />
            <p className="text-lg font-semibold text-[#A7F3D0]">
              {item.titulo}
            </p>
            <p className="text-sm mt-1 text-gray-300">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
