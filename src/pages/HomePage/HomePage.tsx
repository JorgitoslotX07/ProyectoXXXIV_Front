import type { FC } from "react";

export const HomePage: FC = () => {


  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 mt-32 ml-24 mr-24">
        Titulo, no se que poner
      </h1>

      <div className="flex flex-col lg:flex-row items-start gap-12 mt-20 px-10">
        {/* Columna izquierda */}
        <div className="flex-1">
          {/* <h1 className="text-4xl font-bold text-gray-800 mb-10">
            Tagline describing your e-shop
          </h1> */}

          {/* Tabs */}
          <div className="flex rounded-md overflow-hidden mb-10 border border-gray-300 w-max">
            <button className="bg-green-600 text-white flex items-center px-4 py-2 gap-2">
              <img src="/images/car.png" alt="Car icon" className="w-8 h-8" />
              Coches
            </button>
            <button className="bg-white text-gray-700 flex items-center px-4 py-2 gap-2">
              <img src="/images/van.png" alt="Van icon" className="w-8 h-8" />
              Furgonetas
            </button>
          </div>

          {/* Buscador */}
          <div className="mb-8">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 w-full max-w-xl">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full focus:outline-none"
              />
            </div>
          </div>

          {/* Fechas */}
          <div className="flex gap-6">
            <input
              type="date"
              className="border border-gray-400 rounded-md px-4 py-2"
              defaultValue="2025-12-05"
            />
            <input
              type="date"
              className="border border-gray-400 rounded-md px-4 py-2"
              defaultValue="2025-12-05"
            />
          </div>
        </div>

        {/* Columna derecha (Imagen decorativa) */}
        <div className="hidden lg:block w-80 h-80 bg-gray-200 rounded-md flex justify-center items-center">
          {/* Puedes reemplazar esto con una imagen real */}
          <svg
            className="w-24 h-24 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm0 2h12v10H4V5zm2 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
        </div>
      </div>


    </>
  );
};
