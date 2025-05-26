import { type FC } from "react";
import type { CardProductProps } from "../../interfaces/CardProductProps";

export const CardcocheComponent: FC<CardProductProps> = ({ coche, index }) => {
  return (
    <>
      {/* <div
        className="bg-white shadow-md rounded-2xl p-4 w-full max-w-sm"
        key={index}
      >
        {coche.imagen ? (
          <img
            src={coche.imagen}
            alt={`${coche.marca} ${coche.modelo}`}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}
        <h2 className="text-xl font-bold mb-1">
          {coche.marca} {coche.modelo}
        </h2>
        <p className="text-gray-600 mb-1">
          Ciudad: <span className="font-semibold">{coche.localidad}</span>
        </p>
        <p className="text-gray-600 mb-1">
          Autonomía: <span className="font-semibold">{coche.autonomia} km</span>
        </p>
      </div> */}

      <div
        className="bg-[#1F2937] shadow-lg rounded-2xl p-4 w-full max-w-sm"
        key={index}
      >
        {coche.imagen ? (
          <img
            src={coche.imagen}
            alt={`${coche.marca} ${coche.modelo}`}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        ) : (
          <div className="w-full h-40 bg-gray-700 rounded-xl mb-4 flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
        <h2 className="text-xl font-bold mb-1 text-[#C4B5FD]">
          {coche.marca} {coche.modelo}
        </h2>
        <p className="text-gray-300 mb-1">
          Ciudad: <span className="font-semibold text-white">{coche.localidad}</span>
        </p>
        <p className="text-gray-300 mb-1">
          Autonomía: <span className="font-semibold text-white">{coche.autonomia} km</span>
        </p>
      </div>

    </>
  );
};
