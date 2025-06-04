import { useState, type ChangeEvent, type FC } from "react";
import type { UsuarioMe } from "../../../interfaces/Usuario";
import { httpPatchTokImg } from "../../../utils/apiService";
import { useTranslation } from "react-i18next";

interface Props {
  usuario: UsuarioMe;
  modoClaro: boolean;
}

export const ActualarAvatarComponent: FC<Props> = ({ usuario, modoClaro }) => {
  const { t } = useTranslation();
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [imagen, setImagen] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagen(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGuardar = async () => {
    if (!imagen) return;

    const formData = new FormData();
    formData.append("foto", imagen);

    try {
      const response = await httpPatchTokImg(
        "/usuarios/me/cambiar-foto",
        formData
      );
      console.log("Imagen subida con éxito", response);
      setMostrarPopup(false);
      window.location.reload();
      // } else {
      //   console.error("Error al subir la imagen");
      // }
    } catch (error) {
      console.error("Error en la petición", error);
    }
    console.log("a")
  };

  return (
    <div className="w-1/3 flex flex-col items-center m-auto">
      {usuario.fotoUrl ? (
        <img
          src={usuario.fotoUrl}
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

      <button
        className="text-sm mt-2 text-purple-400 hover:underline cursor-pointer"
        onClick={() => setMostrarPopup(true)}
      >
        {t("avatar.changePhoto")}
      </button>

      {mostrarPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`rounded-2xl p-6 shadow-lg w-96 transition-all duration-300 ${
              modoClaro ? "bg-white text-[#222]" : "bg-[#111] text-white"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4 text-purple-600">
              {t("avatar.title")}
            </h2>

            {previewUrl && (
              <img
                src={previewUrl}
                alt={t("avatar.previewAlt")}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleArchivo}
              className="mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                className={`px-4 py-1 rounded-md text-sm ${
                  modoClaro
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    : "bg-gray-600 hover:bg-gray-500 text-white"
                }`}
                onClick={() => setMostrarPopup(false)}
              >
                {t("avatar.cancel")}
              </button>
              <button
                className="px-4 py-1 rounded-md text-sm bg-purple-500 text-white hover:bg-purple-600"
                onClick={handleGuardar}
              >
                {t("avatar.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
