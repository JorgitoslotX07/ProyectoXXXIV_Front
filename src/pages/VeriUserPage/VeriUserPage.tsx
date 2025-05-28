import { useNavigate } from "react-router-dom";
import { useEffect, useState, type FC, type ReactElement } from "react";
import { httpGetTok } from "../../utils/apiService";
import {
  usuarioCompletoVacio,
  type UsuarioCompleto,
} from "../../interfaces/Usuario";
import { ImageWebCame } from "../../components/ImageWebCame/ImageWebCame";
import { conversiorFile } from "../../utils/conversorServise";


export const VeriUserPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioCompleto>(usuarioCompletoVacio);
  const [imageSource, setImageSource] = useState<string>("webcam");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    // const fetch = async () => {
    //   const data = await httpGetTok<UsuarioCompleto>("/usuarios/me");
    //   if (data) {
    //     setUsuario(data);
    //   }
    // };

    // fetch();
  }, []);

  function setImageConversor(e: React.ChangeEvent<HTMLInputElement>) {
    conversiorFile(e, setImage);
  }

  function handleVerificarImagen() {
    if (!image) return;
    // Aquí iría la lógica para enviar la imagen
    console.log("Enviando imagen:", image);
  }

  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0 bg-[url('/fondoPanel.jpg')] bg-cover bg-center opacity-10"></div>

      <div className="relative min-h-screen text-white px-8 py-10">
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-[#1F2937]  text-white">
          <h2 className="text-2xl font-semibold mb-4 text-center">Verificar Identidad</h2>
          <div className="mb-6 text-left">
            <div className="mb-6 text-left">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Previsualización:</h3>
            <div className="w-full aspect-video rounded-xl border border-gray-700 shadow-md bg-[#111827] flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Previsualización"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <svg
                  className="w-16 h-16 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.75A2.75 2.75 0 015.75 5h12.5A2.75 2.75 0 0121 7.75v8.5A2.75 2.75 0 0118.25 19H5.75A2.75 2.75 0 013 16.25v-8.5zM15.25 10.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Seleccionar método de captura:</label>
            <select
              className="w-full bg-[#374151] text-white p-2 rounded-md border border-gray-600 focus:outline-none"
              value={imageSource}
              onChange={(e) => setImageSource(e.target.value as "file" | "webcam")}
            >
              <option value="file">Archivo</option>
              <option value="webcam">Webcam</option>
            </select>
          </div>

          {imageSource === "file" && (
            <div className="mb-4">
              <label htmlFor="file-upload" className="block mb-2 font-medium">
                Selecciona una imagen:
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setImageConversor(e)}
                className="w-full bg-[#374151] text-white p-2 rounded-md border border-gray-600 cursor-pointer"
              />
            </div>
          )}

          {imageSource === "webcam" && <ImageWebCame setImage={setImage} />}



          <div className="mt-6 flex justify-center">
            <button
              onClick={handleVerificarImagen}
              className="w-500 h-14 bg-[#A7F3D0] hover:bg-[#6EE7B7] text-[#111827] font-size font-semibold rounded-2xl shadow transition duration-200 flex items-center justify-center text-lg"
            >
              Verificar imagen
            </button>
          </div>

        </div>
      </div>
    </div>

  );
};
