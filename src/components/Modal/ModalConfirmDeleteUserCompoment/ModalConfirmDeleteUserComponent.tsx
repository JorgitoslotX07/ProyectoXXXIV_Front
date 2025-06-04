import type { FC } from "react";
import { httpDeleteTok } from "../../../utils/apiService";
import type { ModalGestionUserProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import { useTranslation } from "react-i18next";

export const ModalConfirmDeleteUserComponent: FC<ModalGestionUserProps> = ({ onClose, usuario }) => {
  const { t } = useTranslation();

  const onConfirm = async () => {
    console.log("Delete User", usuario);
    const response = await httpDeleteTok(`/usuarios/${usuario?.id}`);
    console.log(response);
  };

  const handleSubmit = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalBaseComponent onClose={onClose} titulo={t("admin.users.modalDelete.title")}>
      <h2 className="text-lg font-semibold mb-4">{t("admin.users.modalDelete.title")}</h2>
      <p className="mb-4">
        {t("admin.users.modalDelete.confirmText", { username: usuario?.usuario })}
      </p>
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
          {t("admin.users.modalDelete.cancel")}
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-red-600 text-white rounded">
          {t("admin.users.modalDelete.delete")}
        </button>
      </div>
    </ModalBaseComponent>
  );
};
