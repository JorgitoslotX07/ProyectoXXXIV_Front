import { type FC } from "react";
import { motion } from "framer-motion";
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
    <div className="bg-[rgb(22,23,64)] backdrop-blur-[10px] backdrop-saturate-[100%] min-h-screen text-white font-sans">

      {/* MAPA - sin animaciones */}
      <Link to="/map">
        <div className="w-full h-40 relative group cursor-pointer overflow-hidden border border-black rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
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

      {/* SECCIÓN DE BENEFICIOS - animaciones más elaboradas */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-h-[45em] flex flex-col lg:flex-row items-stretch justify-between px-10 py-16 gap-10 relative overflow-hidden shadow-xl"
      >
        <div className="absolute inset-0 bg-[#162947] [background-image:radial-gradient(at_47%_90%,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] bg-cover bg-center opacity-20"></div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 1.2, ease: "easeOut" },
            },
          }}
          className="bg-[#162947] [background-image:radial-gradient(at_bottom_right,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] backdrop-blur-md backdrop-saturate-150 rounded-2xl border-white/10 p-8 text-white shadow-lg z-10 lg:w-1/2"
        >
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold text-[#C4B5FD] mb-4"
          >
            ¿Por qué usar Share&Go 34?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-lg text-gray-300 leading-relaxed mb-6"
          >
            Nuestra plataforma de car sharing te conecta con los mejores vehículos disponibles en tu ciudad de forma rápida y sostenible.
          </motion.p>
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            {["Accede a coches eléctricos y ecológicos", "Reserva inmediata desde el mapa", "Filtros inteligentes para encontrar el coche ideal", "Sin papeleos ni esperas"].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.6, ease: "easeOut" }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 1.2, ease: "easeOut" },
            },
          }}
          className="lg:w-1/2 relative z-10"
        >
          <img
            src="/public/fondo-desc-home-car.jpg"
            alt="Vehículo promocional"
            className="rounded-xl shadow-xl w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* BUSCADOR */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10"
      >
        <div className="absolute inset-0 bg-[url('fondoFastSeartch.webp')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-white p-10">
          <SearchFastComponent
            onClickOptionsPerfil={onClickOptionsPerfil}
            onLoginClick={onLoginClick}
          />
        </div>
      </motion.div>

      {/* NOTICIAS + COCHES */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
        className="[background-image:radial-gradient(at_bottom_right,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] backdrop-blur-md backdrop-saturate-150 bg-black/35 border-white/10 p-8 relative"
      >
        <div className="absolute inset-0 bg-[#162947] [background-image:radial-gradient(at_47%_33%,hsl(163.5,83%,24%)_0,#0a0a0a_59%),radial-gradient(at_82%_65%,hsl(218.82,77%,21%)_0,transparent_55%)] bg-cover bg-center opacity-15"></div>

        <div className="relative z-10">
          <div className="pt-20 px-10">
            <h2 className="text-2xl font-semibold mb-6 pl-3 text-[#C4B5FD]">
              Noticias sobre Car Sharing
            </h2>
            <NoticiasComponent />
          </div>

          <div className="mt-20 px-10 pb-20">
            <CochesPromoComponent />
          </div>
        </div>
      </motion.div>
    </div>
  );
};