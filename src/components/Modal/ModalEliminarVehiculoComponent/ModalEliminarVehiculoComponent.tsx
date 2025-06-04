import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import type { ModalElimarVehiculoProps } from "../../../interfaces/ModalProps";
import { httpDeleteTok } from "../../../utils/apiService";

interface Props extends ModalElimarVehiculoProps {
  modoClaro: boolean;
}

export const ModalEliminarVehiculo: FC<Props> = ({ vehiculo, onClose, modoClaro }) => {
  const { t } = useTranslation();

  async function onConfirmar() {
    const respons = await httpDeleteTok(`/vehiculos/${vehiculo.id}`);
    console.log(respons);
    onClose(); // Opcional: cerrar tras eliminar
  }

  return (
    <ModalBaseComponent onClose={onClose} titulo={t("modal.deleteVehicle.title")}>
      <p className={`mb-6 ${modoClaro ? "text-[#111]" : "text-white"}`}>
        {t("modal.deleteVehicle.confirm")}{" "}
        <strong>
          {vehiculo.marca} {vehiculo.modelo}
        </strong>
        ?
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className={`px-4 py-2 rounded ${
            modoClaro
              ? "bg-gray-200 text-[#111] hover:bg-gray-300"
              : "bg-gray-600 text-white hover:bg-gray-500"
          }`}
        >
          {t("modal.deleteVehicle.cancel")}
        </button>
        <button
          onClick={onConfirmar}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
        >
          {t("modal.deleteVehicle.delete")}
        </button>
      </div>
    </ModalBaseComponent>
  );
};
