import { type FC } from "react";
import { NoticiasComponent } from "../../components/NoticiasComponent/NoticiasComponent";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { SearchFastComponent } from "../../components/SearchFastComponent/SearchFastComponent";
import { Link } from "react-router-dom";

export const HomePage: FC<HomePageProps> = ({
  onClickOptionsPerfil,
  onLoginClick,
}) => {
  return (
    // <>
    //   <Link to="/map">
    //     <div className="w-full h-40 relative group cursor-pointer overflow-hidden">
    //       <img
    //         src="/MapClick.png"
    //         alt="Mapa de ubicación"
    //         className="object-cover object-top w-full h-full transition-opacity duration-300"
    //       />

    //       <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-60 transition-opacity duration-300 bg-black bg-opacity-50">
    //         <a
    //           href="/nueva-pagina"
    //           className="text-white  text-lg font-semibold px-4 py-2"
    //         >
    //           Ver en el mapa
    //         </a>
    //       </div>
    //     </div>
    //   </Link>

    //   <SearchFastComponent
    //     onClickOptionsPerfil={onClickOptionsPerfil}
    //     onLoginClick={onLoginClick}
    //   />
    //   <div className="mt-20 px-10">
    //     <NoticiasComponent />
    //   </div>

    //   <div className="mt-20 px-10">
    //     <CochesPromoComponent />
    //   </div>
    // </>
    <>
      <div className="bg-[#111827] min-h-screen text-white font-sans">
        <Link to="/map">
          <div className="w-full h-40 relative group cursor-pointer overflow-hidden border border-black rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            {" "}
            {/* [#374151]*/}
            <img
              src="/MapClick.png"
              alt="Mapa de ubicación"
              className="object-cover object-top w-full h-full opacity-80 group-hover:opacity-60 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity duration-500 bg-black bg-opacity-60">
              <span className="text-[#C4B5FD] text-lg font-semibold px-4 py-2 transition-colors duration-300">
                Ver en el mapa
              </span>
            </div>
          </div>
        </Link>
        {/* <div className=" bg-[url('fondoFastSeartch2.webp')] bg-cover bg-center bg-opacity-50">
          <SearchFastComponent
            onClickOptionsPerfil={onClickOptionsPerfil}
            onLoginClick={onLoginClick}
          />
        </div> */}
        <div className="max-h-[45em] flex flex-col lg:flex-row items-stretch justify-between px-10 py-16 gap-10 relative overflow-hidden rounded-xl shadow-xl">

          <img
            src="/public/fondo-desc-home.jpg"
            alt="Fondo visual"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />


          <div className="absolute inset-0 bg-black/1 backdrop-blur-[2px] z-0"></div>



          <div className="rounded-xl shadow-xl bg-black/65 lg:w-1/2 p-10 flex flex-col justify-start relative z-10 text-white">
            <h2 className="backdrop-blur-[2px] text-4xl font-bold text-[#C4B5FD] mb-4">
              ¿Por qué usar Share&Go 34?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Nuestra plataforma de car sharing te conecta con los mejores vehículos disponibles en tu ciudad de forma rápida y sostenible.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Accede a coches eléctricos y ecológicos</li>
              <li>Reserva inmediata desde el mapa</li>
              <li>Filtros inteligentes para encontrar el coche ideal</li>
              <li>Sin papeleos ni esperas</li>
            </ul>
          </div>


          <div className="lg:w-1/2 relative z-10">
            <img
              src="/public/fondo-desc-home-car.jpg"
              alt="Vehículo promocional"
              className="rounded-xl shadow-xl w-full h-full object-cover"
            />
          </div>
        </div>


        <div className="relative">
          <div className="absolute inset-0 bg-[url('fondoFastSeartch.webp')] bg-cover bg-center opacity-40"></div>

          <div className="relative z-10 text-white p-10">
            <SearchFastComponent
              onClickOptionsPerfil={onClickOptionsPerfil}
              onLoginClick={onLoginClick}
            />
          </div>
        </div>

        <div className="mt-20 px-10">
          <h2 className="text-2xl font-semibold mb-6 pl-3" style={{ color: '#C4B5FD' }}>
            Noticias sobre Car Sharing
          </h2>
          <NoticiasComponent />
        </div>

        <div className="mt-20 px-10 pb-20">
          <CochesPromoComponent />
        </div>
      </div>
    </>
  );
};
