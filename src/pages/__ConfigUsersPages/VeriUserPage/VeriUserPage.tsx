import { useEffect, useState, type FC, type ReactElement } from "react";
import { UsuarioMe } from "../../../interfaces/Usuario";
import { conversiorFile } from "../../../utils/conversorServise";
import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import { ImageWebCame } from "../../../components/__ConfigUser/ImageWebCame/ImageWebCame";
import { httpGetTok, httpPostTok } from "../../../utils/apiService";

export const VeriUserPage: FC = (): ReactElement => {
  // const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioMe>(UsuarioMe);
  const [imageSource, setImageSource] = useState<string>("webcam");
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioMe>("/usuarios/me");
      if (data) {
        setUsuario(data);
      }
    };
    fetch();
  }, []);

  function setImageConversor(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      console.log(file);
    }
    conversiorFile(e, setImagePreview);
  }

  function setImageWebCam(dataUrl: string) {
    fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
        setImage(file);
        setImagePreview(dataUrl);
      });
  }

  async function handleVerificarImagen() {
    if (!image) return;
    const formData = new FormData();
    formData.append("usuario", usuario.username);
    formData.append("imagen", image);
    console.log(usuario.username)

    const resul = await httpPostTok("/carnets/saveimg", formData);

    console.log(resul);
    console.log("Enviando imagen:", image);
  }

  return (
    <FondoPanelComponent>
      <div className="relative min-h-screen  p-8 text-white">
        <TituloComponent titulo={"Verificar Identidad"} />

        <div className="max-w-4xl mx-auto w-full bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 cursor-pointer">
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Previsualización:</h3>
            <div className="w-full aspect-video rounded-xl border border-gray-700 shadow-md bg-[#111827] flex items-center justify-center ">
              {imagePreview ? (
                <img
                  src={imagePreview}
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

          <div className="mb-4 mt-4">
            <label className="block mb-2 font-medium">
              Seleccionar método de captura:
            </label>
            <select
              className="w-full bg-[#374151] text-white p-2 rounded-md border border-gray-600 focus:outline-none"
              value={imageSource}
              onChange={(e) =>
                setImageSource(e.target.value as "file" | "webcam")
              }
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
                // onChange={(e) => setImageConversor(e)}
                onChange={(e) => setImageConversor(e)}
                className="w-full bg-[#374151] text-white p-2 rounded-md border border-gray-600 cursor-pointer"
              />
            </div>
          )}

          {imageSource === "webcam" && (
            <ImageWebCame setImage={setImageWebCam} />
          )}

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
    </FondoPanelComponent>
  );
};
