import { useRef, useState, type FC, type ReactElement } from "react";
import Webcam from "react-webcam";
import type { ImageWebCameProps } from "../../interfaces/ImageWebCameProps";
// import "./WebcamPopup.css";

export const ImageWebCame: FC<ImageWebCameProps> = ({
  setImage,
}): ReactElement => {
  //   const { t } = useTranslation();

  const webcamRef = useRef<Webcam | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const foto = () => {
    if (webcamRef.current) {
      const captura = webcamRef.current.getScreenshot();
      console.log(captura);
      if (captura) {
        setImage(captura);
        setIsOpen(false);
      }
      // else {
      //     setImgError("Error al tomar la foto")
      // }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="start-game-button start-button-webcam "
      >
        {/* {t("openWebCam")} */ "openWebCam"}
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam-view"
              height={500}
              width={500}
            />
            <div className="webcam-mask"></div>
            <div className="popup-buttons">
              <button onClick={foto} className="start-game-button capture">
                {/* {t("capPhotoWebCam")} */ "capPhotoWebCam"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="start-game-button close"
              >
                {/* {t("closeWebCam")} */ "closeWebCam"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <Webcam className="webcam-style"
                audio={false} 
                height={500} 
                ref={webcamRef} 
                screenshotFormat="image/jpeg" 
                width={500} 
            />
            <br/>
            <button onClick={foto}>Hacer captura</button> */}
    </>
  );
};
