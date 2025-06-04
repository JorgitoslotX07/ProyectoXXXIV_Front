import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { ModalNoticiaProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import { httpDeleteTok } from "../../../utils/apiService";

export const ModalNoticiasDelComponent: FC<ModalNoticiaProps> = ({ onClose, noticia, modoClaro = false}) => {
  const { t } = useTranslation();

  async function onConfirm() {
    await httpDeleteTok("/noticias/" + noticia?.id);
    onClose();
  }

  return (
    <ModalBaseComponent onClose={onClose} titulo={t("modal.deleteNews.title")} modoClaro={modoClaro}>
      <p className={`mb-4 ${modoClaro ? "text-[#111]" : "text-white"}`}>
        {t("modal.deleteNews.confirm")}{" "}
        <strong>{noticia?.titulo}</strong>?
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className={`px-4 py-2 rounded ${
            modoClaro
              ? "bg-gray-200 text-[#111] hover:bg-gray-300"
              : "bg-gray-500 text-white hover:bg-gray-400"
          }`}
        >
          {t("modal.deleteNews.cancel")}
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
        >
          {t("modal.deleteNews.delete")}
        </button>
      </div>
    </ModalBaseComponent>
  );
};
