import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { validateMail } from "../../../utils/verificaciones";
import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import { UsuarioMe } from "../../../interfaces/Usuario";
import { httpGetTok, httpPatchTok } from "../../../utils/apiService";

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
        <TituloComponent titulo={t("profile.title")} runtaOut="/panel" modoClaro={modoClaro} />

        <div
          className={`max-w-4xl mx-auto rounded-3xl p-4 shadow-md border transition-all duration-300 ${
            modoClaro
              ? "bg-gradient-to-br from-[#f9ffce] to-[#e2e8f0] border-gray-200"
              : "bg-white/5 border-white/10 backdrop-blur-md"
          }`}
        >
          <div className="flex gap-10">
            {/* Avatar */}
            <div className="w-1/3 flex flex-col items-center">
              {usuario.fotoUrl ? (
                <img
                  src={usuario.fotoUrl}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-4 border-orange-400/30 mb-4 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full mb-4 shadow-md flex items-center justify-center border-4 border-orange-400/30 bg-orange-100 dark:bg-orange-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14 text-orange-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.1 0-9.3 1.6-9.3 4.7v1.1c0 .6.5 1.1 1.1 1.1h16.4c.6 0 1.1-.5 1.1-1.1v-1.1c0-3.1-6.2-4.7-9.3-4.7z" />
                  </svg>
                </div>
              )}
              <button
                className={`text-sm mt-2 transition ${
                  modoClaro ? "text-black hover:text-gray-700" : "text-orange-400 hover:text-white"
                }`}
              >
                {t("profile.changePhoto")}
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="w-2/3 space-y-5 p-8 rounded-2xl">
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
                  className="bg-yellow-400 text-black font-medium px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
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
