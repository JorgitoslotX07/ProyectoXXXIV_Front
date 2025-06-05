import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { validateMail } from "../../../utils/verificaciones";
import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import { UsuarioMe } from "../../../interfaces/Usuario";
import { httpGetTok, httpPatchTok } from "../../../utils/apiService";
import { ActualarAvatarComponent } from "../../../components/__ConfigUser/ActualarAvatarComponent/ActualarAvatarComponent";

interface Props {
  modoClaro: boolean;
}

export const EditarPerfilPage: FC<Props> = ({ modoClaro }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [usuario, setUsuario] = useState<UsuarioMe>(UsuarioMe);
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioMe>("/usuarios/me");
      if (data) setUsuario(data);
    };
    fetch();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const erroresForm: string[] = [];

    if (!validateMail(usuario.email)) erroresForm.push(t("profile.errorEmail"));

    if (erroresForm.length > 0) {
      setErrores(erroresForm);
      return;
    }

    await httpPatchTok(`/usuarios/me/cambiar-email`, {
      email: usuario.email,
    });

    navigate("/panel");
  };

  return (
    <FondoPanelComponent modoClaro={modoClaro}>
      <div
        className={`relative min-h-screen px-8 py-10 transition-all duration-300 ${
          modoClaro ? "text-[#222]" : "text-white"
        }`}
      >
        <TituloComponent
          titulo={t("profile.title")}
          runtaOut="/panel"
          modoClaro={modoClaro}
        />

        <div
          className={`max-w-4xl mx-auto rounded-3xl p-4 shadow-md border transition-all duration-300 ${
            modoClaro
              ? "bg-gradient-to-br from-[#f9ffce] to-[#e2e8f0] border-gray-200"
              : "bg-white/5 border-white/10 backdrop-blur-md"
          }`}
        >
          <div className="flex gap-10">
            
            <ActualarAvatarComponent modoClaro={modoClaro} usuario={usuario} />
            
            <form
              onSubmit={handleSubmit}
              className="w-2/3 space-y-5 p-8 rounded-2xl"
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
                  <label
                    className={`text-sm mb-1 block ${
                      modoClaro ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {t("profile.name")} <br />
                    <span className="text-xl">{usuario.username}</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className={`text-sm mb-1 block ${
                      modoClaro ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {t("profile.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                    placeholder={t("profile.placeholderEmail")}
                    className={`w-full p-2 rounded-md border focus:ring-2 transition ${
                      modoClaro
                        ? "bg-gray-100 text-[#222] placeholder-gray-500 border-gray-300 focus:ring-purple-400"
                        : "bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-purple-500"
                    }`}
                  />
                </div>
              </div>

              <div className="text-right mt-6">
                <button
                  type="submit"
                  className="bg-[#C4B5FD] text-black font-medium px-6 py-2 rounded-lg hover:bg-[#C4B5FD]/80 transition"
                >
                  {t("profile.saveButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FondoPanelComponent>
  );
};
