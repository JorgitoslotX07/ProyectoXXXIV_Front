import { useEffect, type FC } from "react";
// useEffect
import { NoticiasComponent } from "../../components/NoticiasComponent/NoticiasComponent";
import { CochesPromoComponent } from "../../components/CochesPromoComponent/CochesPromoComponent";
import type { HomePageProps } from "../../interfaces/HomePageProps";
import { SearchFastComponent } from "../../components/SearchFastComponent/SearchFastComponent";
import {
  mostrarError,
  mostrarInfo,
  mostrarSuccess,
  mostrarWarning,
} from "../../utils/notiToast";
import { Link } from "react-router-dom";
// import { mostrarError, mostrarInfo, mostrarSuccess, mostrarWarning } from "../../utils/notiToast";
import { NotiToastComponent } from "../../components/NotiToastComponents/NotiToastComponet";

export const HomePage: FC<HomePageProps> = ({
  onClickOptionsPerfil,
  onLoginClick,
}) => {
  useEffect(() => {
    mostrarError("Error al Entrar");
    console.log("Error");
    mostrarInfo("Info al Entrar");
    mostrarWarning("Warning al Entrar");
    mostrarSuccess("Success al Entrar");
  }, []);
  return (
    <>
      <div className="bg-[rgb(22,23,64)] backdrop-blur-[10px] backdrop-saturate-[100%] min-h-screen text-white font-sans">
        {/* <Link to="/map">
          <div className="w-full h-40 relative group cursor-pointer overflow-hidden border border-black rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            {" "}
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
        </Link> */}
        <div className="relative ">
          {/* <div className="absolute inset-0 bg-[#162947] [background-image:radial-gradient(at_47%_33%,hsl(163.5,83%,24%)_0,transparent_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] bg-cover bg-center opacity-40"></div> */}
          <div className="absolute inset-0 bg-[url('fondoFastSeartch.webp')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0  backdrop-blur-[2px]"></div>

          <div className="relative z-10 text-white p-10">
            <SearchFastComponent
              onClickOptionsPerfil={onClickOptionsPerfil}
              onLoginClick={onLoginClick}
            />
          </div>
        </div>
        .
        <div className="absolute inset-0 bg-[#162947] [background-image:radial-gradient(at_47%_90%,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] bg-cover bg-center opacity-20"></div>
        <div className="pt-20 px-10">
          <CochesPromoComponent />
        </div>
        <div className="max-h-[45em] flex flex-col lg:flex-row items-stretch justify-between px-10 py-16 gap-10 relative overflow-hidden shadow-xl">
          <div className="backdrop-blur-md backdrop-saturate-150 bg-black/35 rounded-2xl border border-white/10 p-8 text-white shadow-lg">
            {/* <div className="backdrop-blur-[25px] backdrop-saturate-[200%] bg-[rgba(0,0,0,0.78)] rounded-[12px] border border-[rgba(255,255,255,0.125)] lg:w-1/2 p-10 flex flex-col justify-start relative z-10 text-white "> */}
            {/* <div className="bg-[#162947] [background-image:radial-gradient(at_bottom_right,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] backdrop-blur-md backdrop-saturate-150 rounded-2xl border-white/10 p-8 text-white shadow-lg"> */}

            <h2 className=" text-4xl font-bold text-[#C4B5FD] mb-4">
              ¿Por qué usar Share&Go 34?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Nuestra plataforma de car sharing te conecta con los mejores
              vehículos disponibles en tu ciudad de forma rápida y sostenible.
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
        <div className="relative ">
          <div className="mt-20 px-10 pb-20">
            <h2
              className="text-2xl font-semibold mb-6 pl-3"
              style={{ color: "#C4B5FD" }}
            >
              Noticias sobre Car Sharing
            </h2>
            <NoticiasComponent />
          </div>
        </div>
        <Link to="/map">
          <div className="w-full h-40 relative group cursor-pointer overflow-hidden border border-black rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            {" "}
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
      </div>
      <NotiToastComponent />
    </>
  );
};
