import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import type { ModalGestionUserProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import { httpPatchTok } from "../../../utils/apiService";

interface Props extends ModalGestionUserProps {
    modoClaro: boolean;
}

export const ModalEditUserComponent: FC<Props> = ({ onClose, usuario, modoClaro }) => {
    const { t } = useTranslation();
    const [mensaje, setMensaje] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await httpPatchTok(`/usuarios/bloquear/${usuario?.id}`, { mensaje });
        console.log(response);
        onClose();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setMensaje(e.target.value);
    };

    const estiloTexto = modoClaro ? "text-[#111]" : "text-white";
    const fondoCampo = modoClaro
        ? "bg-gray-100 text-[#111] border-gray-300 placeholder-gray-500"
        : "bg-gray-800 text-white border-gray-600 placeholder-gray-400";

    return (
        <ModalBaseComponent onClose={onClose} titulo={t("modal.editUser.title")}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <p className={`text-sm ${modoClaro ? "text-gray-700" : "text-gray-300"}`}>
                    {t("modal.editUser.question")}
                </p>

                <label className={`flex items-center space-x-2 font-semibold ${estiloTexto}`}>
                    <span>{usuario?.usuario}</span>
                </label>

                <textarea
                    name="motivo"
                    value={mensaje}
                    onChange={handleChange}
                    placeholder={t("modal.editUser.placeholder")}
                    required
                    className={`w-full border p-2 rounded ${fondoCampo}`}
                    rows={3}
                />

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className={`px-4 py-2 rounded ${modoClaro
                                ? "bg-gray-200 text-[#111] hover:bg-gray-300"
                                : "bg-gray-600 text-white hover:bg-gray-500"
                            }`}
                    >
                        {t("modal.editUser.cancel")}
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
                    >
                        {t("modal.editUser.ban")}
                    </button>
                </div>
            </form>
        </ModalBaseComponent>
    );
};
