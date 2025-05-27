import { useNavigate } from "react-router-dom";
import { useEffect, useState, type FC, type ReactElement } from "react";
import { httpGetTok } from "../../utils/apiService";
import {
  usuarioCompletoVacio,
  type UsuarioCompleto,
} from "../../interfaces/Usuario";
import { ImageWebCame } from "../../components/ImageWebCame/ImageWebCame";
import { conversiorFile } from "../../utils/conversorServise";

// import { useTranslation } from "react-i18next";

export const VeriUserPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioCompleto>(usuarioCompletoVacio);
  const [imageSource, setImageSource] = useState<string>("webcam");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioCompleto>("/usuarios/me");
      if (data) {
        setUsuario(data);
        console.log(data);
      }
    };

    fetch();
  }, []);

  // const { t } = useTranslation();

  function setImageConversor(e: React.ChangeEvent<HTMLInputElement>) {
    conversiorFile(e, setImage);
  }

  return (
    <>
      <select
        className="text-input"
        value={imageSource}
        onChange={(e) =>
          setImageSource(e.target.value as "file" | "url" | "webcam")
        }
      >
        <option value="file">
          {
            // t("file")
            "file"
          }
        </option>
        <option value="webcam">
          {
            // t("webcam")
            "webcam"
          }
        </option>
      </select>

      {imageSource === "file" && (
        <>
          <label htmlFor="file-upload" className="file-upload-input">
            {/* {t("selectFile") */ "selectFile"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImageConversor(e)}
            className="file-input"
          />
        </>
      )}

      {imageSource === "webcam" && (
        // <p className="webcam-placeholder">📷 Webcam functionality coming soon...</p>
        <ImageWebCame setImage={setImage} />
      )}
    </>
  );
};
