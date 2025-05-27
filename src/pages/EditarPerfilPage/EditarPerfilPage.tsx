// src/pages/EditarPerfilPage/EditarPerfilPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateMail,
  validateFechaNacimiento,
  validarDNI,
} from "../../utils/verificaciones";
import {
  usuarioCompletoVacio,
  type UsuarioCompleto,
} from "../../interfaces/Usuario";

export const EditarPerfilPage = () => {
  const navigate = useNavigate();
  const emailLogueado = localStorage.getItem("emailLogueado");

  const [usuario, setUsuario] = useState<UsuarioCompleto>(usuarioCompletoVacio);
  const [errores, setErrores] = useState<string[]>([]);

  // if (!emailLogueado) {
  //   return (
  //     <div className="p-4 text-red-600">
  //       No hay usuario logueado. Por favor, inicia sesión.
  //     </div>
  //   );
  // }

  // if (indexUsuario === -1) {
  //   return (
  //     <div className="p-4 text-red-600">
  //       Usuario no encontrado. Verifica el email en localStorage.
  //     </div>
  //   );
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const erroresForm: string[] = [];

    if (!validateName(usuario.usuario)) erroresForm.push("Nombre inválido");
    if (!validateMail(usuario.email)) erroresForm.push("Correo inválido");
    // if (!validatePassword(usuario.))
    //   erroresForm.push("Contraseña débil");
    if (!validateFechaNacimiento(usuario.fechaNacimiento))
      erroresForm.push("Fecha inválida");
    if (!validarDNI(usuario.dni)) erroresForm.push("DNI inválido");

    if (erroresForm.length > 0) {
      setErrores(erroresForm);
      return;
    }

    navigate("/panel");
  };

  return (
    // <div className="p-6 max-w-md mx-auto">
    //   <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>

    //   {errores.length > 0 && (
    //     <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
    //       <ul>
    //         {errores.map((err, i) => (
    //           <li key={i}>• {err}</li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}

    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <input
    //       type="text"
    //       name="name"
    //       value={usuario.usuario}
    //       onChange={handleChange}
    //       placeholder="Nombre"
    //       className="w-full p-2 border rounded"
    //     />
    //     <input
    //       type="email"
    //       name="email"
    //       value={usuario.email}
    //       onChange={handleChange}
    //       placeholder="Correo"
    //       className="w-full p-2 border rounded"
    //     />

    //     <input
    //       type="date"
    //       name="fechaNacimiento"
    //       value={usuario.fechaNacimiento}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //     />
    //     <input
    //       type="text"
    //       name="dni"
    //       value={usuario.dni}
    //       onChange={handleChange}
    //       placeholder="DNI"
    //       className="w-full p-2 border rounded"
    //     />
    //     <button
    //       type="submit"
    //       className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    //     >
    //       Guardar cambios
    //     </button>
    //   </form>
    // </div>

    // <div className="relative bg-gray-900">
    //   <div className="absolute inset-0 bg-[url('fondoPanel.jpg')] bg-cover bg-center opacity-10"></div>
    //   {/* <div className="min-h-screen  text-white px-8 py-10">
    //     <h1 className="text-3xl font-bold mb-10">Editar Perfil</h1> */}

    //   {/* <div className="min-h-screen flex items-center justify-center text-white px-8 py-10">
    //   <h1 className="text-3xl font-bold mb-10">Editar Perfil</h1> */}
    //   <div className="min-h-screen text-white px-8 py-10">
    //       <h1 className="text-3xl font-bold mb-10 text-center">Editar Perfil</h1>

    //       <div className="max-w-md mx-auto">

    //       <div className="flex gap-10 max-w-2xl">
    //         <div className="w-1/3 flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-lg">
    //           {usuario.avatar ? (
    //             <img
    //               src={usuario.avatar}
    //               alt="Avatar"
    //               className="w-28 h-28 rounded-full border-4 border-purple-400/30 mb-4 shadow-md"
    //             />
    //           ) : (
    //             <div className="w-28 h-28 rounded-full border-4 border-purple-400/30 mb-4 shadow-md flex items-center justify-center bg-purple-500/10">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="w-14 h-14 text-purple-300"
    //                 viewBox="0 0 24 24"
    //                 fill="currentColor"
    //               >
    //                 <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.1 0-9.3 1.6-9.3 4.7v1.1c0 .6.5 1.1 1.1 1.1h16.4c.6 0 1.1-.5 1.1-1.1v-1.1c0-3.1-6.2-4.7-9.3-4.7z" />
    //               </svg>
    //             </div>
    //           )}
    //           <button className="text-sm mt-2 text-purple-400 hover:underline">
    //             Cambiar foto
    //           </button>
    //         </div>

    //         <form
    //           onSubmit={handleSubmit}
    //           className="w-2/3 space-y-5 bg-gray-800 p-8 rounded-2xl shadow-lg"
    //         >
    //           {errores.length > 0 && (
    //             <div className="bg-red-600/20 border border-red-600 text-red-300 p-3 rounded-md">
    //               <ul className="text-sm space-y-1">
    //                 {errores.map((err, i) => (
    //                   <li key={i}>• {err}</li>
    //                 ))}
    //               </ul>
    //             </div>
    //           )}

    //           <div className="grid grid-cols-2 gap-5">
    //             <div>
    //               <label className="text-sm text-gray-300 mb-1 block">Nombre</label>
    //               <input
    //                 type="text"
    //                 name="usuario"
    //                 value={usuario.usuario}
    //                 onChange={handleChange}
    //                 placeholder="Nombre"
    //                 className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
    //               />
    //             </div>
    //             <div>
    //               <label className="text-sm text-gray-300 mb-1 block">Apellidos</label>
    //               <input
    //                 type="text"
    //                 name="apellidos"
    //                 // value={usuario.apellidos ?? ""}
    //                 onChange={handleChange}
    //                 placeholder="Apellidos"
    //                 className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
    //               />
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-2 gap-5">
    //             <div>
    //               <label className="text-sm text-gray-300 mb-1 block">Correo</label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 value={usuario.email}
    //                 onChange={handleChange}
    //                 placeholder="Correo"
    //                 className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
    //               />
    //             </div>
    //             <div>
    //               <label className="text-sm text-gray-300 mb-1 block">Teléfono</label>
    //               <input
    //                 type="tel"
    //                 name="telefono"
    //                 // value={usuario.telefono ?? ""}
    //                 onChange={handleChange}
    //                 placeholder="Teléfono"
    //                 className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
    //               />
    //             </div>
    //           </div>

    //           <div className="text-right mt-6">
    //             <button
    //               type="submit"
    //               className="bg-purple-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-purple-600 transition"
    //             >
    //               Guardar cambios
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="relative bg-gray-900">
  {/* Fondo con opacidad */}
  <div className="absolute inset-0 bg-[url('fondoPanel.jpg')] bg-cover bg-center opacity-10"></div>

  <div className="relative min-h-screen text-white px-8 py-10">
    <h1 className="text-3xl font-bold mb-10 text-center">Editar Perfil</h1>

    <div className="max-w-4xl mx-auto">
      <div className="flex gap-10">
        <div className="w-1/3 flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-lg">
          {usuario.avatar ? (
            <img
              src={usuario.avatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-purple-400/30 mb-4 shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-purple-400/30 mb-4 shadow-md flex items-center justify-center bg-purple-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14 text-purple-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.1 0-9.3 1.6-9.3 4.7v1.1c0 .6.5 1.1 1.1 1.1h16.4c.6 0 1.1-.5 1.1-1.1v-1.1c0-3.1-6.2-4.7-9.3-4.7z" />
              </svg>
            </div>
          )}
          <button className="text-sm mt-2 text-purple-400 hover:underline">
            Cambiar foto
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-2/3 space-y-5 bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          {errores.length > 0 && (
            <div className="bg-red-600/20 border border-red-600 text-red-300 p-3 rounded-md">
              <ul className="text-sm space-y-1">
                {errores.map((err, i) => (
                  <li key={i}>• {err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Nombre</label>
              <input
                type="text"
                name="usuario"
                value={usuario.usuario}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                onChange={handleChange}
                placeholder="Apellidos"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Correo</label>
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                placeholder="Correo"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="text-right mt-6">
            <button
              type="submit"
              className="bg-purple-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  );
};
