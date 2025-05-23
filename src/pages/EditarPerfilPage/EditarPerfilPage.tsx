// src/pages/EditarPerfilPage/EditarPerfilPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateMail,
  validatePassword,
  validateFechaNacimiento,
  validarDNI,
  usuarios,
} from "../../utils/verificaciones";

export const EditarPerfilPage = () => {
  const navigate = useNavigate();
  const emailLogueado = localStorage.getItem("emailLogueado");

  const indexUsuario = emailLogueado
    ? usuarios.findIndex((u) => u.email === emailLogueado)
    : -1;

  const usuarioOriginal =
    indexUsuario !== -1
      ? usuarios[indexUsuario]
      : {
          name: "",
          email: "",
          password: "",
          fechaNacimiento: "",
          dni: ""
        };

  const [usuario, setUsuario] = useState({ ...usuarioOriginal });
  const [errores, setErrores] = useState<string[]>([]);

  if (!emailLogueado) {
    return (
      <div className="p-4 text-red-600">
        No hay usuario logueado. Por favor, inicia sesión.
      </div>
    );
  }

  if (indexUsuario === -1) {
    return (
      <div className="p-4 text-red-600">
        Usuario no encontrado. Verifica el email en localStorage.
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const erroresForm: string[] = [];

    if (!validateName(usuario.name)) erroresForm.push("Nombre inválido");
    if (!validateMail(usuario.email)) erroresForm.push("Correo inválido");
    if (!validatePassword(usuario.password)) erroresForm.push("Contraseña débil");
    if (!validateFechaNacimiento(usuario.fechaNacimiento)) erroresForm.push("Fecha inválida");
    if (!validarDNI(usuario.dni)) erroresForm.push("DNI inválido");

    if (erroresForm.length > 0) {
      setErrores(erroresForm);
      return;
    }

    usuarios[indexUsuario] = { ...usuario };
    console.log("Datos actualizados correctamente:", usuarios[indexUsuario]);
    navigate("/panel");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>

      {errores.length > 0 && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          <ul>
            {errores.map((err, i) => (
              <li key={i}>• {err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={usuario.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          placeholder="Correo"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={usuario.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={usuario.fechaNacimiento}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="dni"
          value={usuario.dni}
          onChange={handleChange}
          placeholder="DNI"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};
