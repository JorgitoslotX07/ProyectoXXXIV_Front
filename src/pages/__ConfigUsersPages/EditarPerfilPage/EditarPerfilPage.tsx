import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateMail } from "../../../utils/verificaciones";

import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import { UsuarioMe } from "../../../interfaces/Usuario";
import { httpGetTok, httpPatchTok } from "../../../utils/apiService";
import { ActualarAvatarComponent } from "../../../components/__ConfigUser/ActualarAvatarComponent/ActualarAvatarComponent";

export const EditarPerfilPage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioMe>(UsuarioMe);
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioMe>("/usuarios/me");
      if (data) {
        setUsuario(data);
      }
    };

    fetch();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const erroresForm: string[] = [];

    if (!validateMail(usuario.email)) erroresForm.push("Correo inválido");

    if (erroresForm.length > 0) {
      setErrores(erroresForm);
      return;
    }
    const respons = await httpPatchTok(`/usuarios/me/cambiar-email`, {
      email: usuario.email,
    });
    console.log(respons);

    navigate("/panel");
  };

  return (
    <FondoPanelComponent>
      <div className="relative min-h-screen text-white px-8 py-10">
        {/* <h1 className="text-3xl font-bold mb-10 text-center">Editar Perfil</h1> */}

        <TituloComponent titulo={"Editar Perfil"} />

        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10">
          <div className="flex gap-10">
            <ActualarAvatarComponent usuario={usuario} />

            <form
              onSubmit={handleSubmit}
              className="w-2/3 space-y-5  p-8 rounded-2xl"
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
                  <label className="text-sm text-gray-300 mb-1 block">
                    Nombre <br />{" "}
                    <span className="text-xl">{usuario.username}</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">
                    Correo
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                    placeholder="Correo"
                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="text-right mt-6">
                <button
                  type="submit"
                  className="bg-purple-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FondoPanelComponent>
  );
};
