// src/components/parkings/ParkingForm.tsx
import { useState, useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import type { ParkingFormProps } from "../../../interfaces/Parking";

export const ParkingForm: FC<ParkingFormProps> = ({ polygon, onSave, modoClaro }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(name.trim() !== "" && capacity > 0 && polygon.length >= 3);
  }, [name, capacity, polygon]);

  const inputBase = "w-full p-2 rounded border focus:outline-none";
  const estiloInput = modoClaro
    ? "bg-gray-100 text-[#111] border-gray-300 placeholder-gray-500"
    : "bg-gray-800 text-white border-gray-600 placeholder-gray-400";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ name, capacity, polygon });
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            {t("createParking.fields.name")}:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${inputBase} ${estiloInput}`}
            required
            placeholder={t("createParking.fields.name")}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            {t("createParking.fields.capacity")}:
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            min={1}
            required
            className={`${inputBase} ${estiloInput}`}
            placeholder="0"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            {t("createParking.fields.polygon")}:
          </label>
          <textarea
            readOnly
            value={JSON.stringify(polygon, null, 2)}
            className={`${inputBase} ${estiloInput} h-32 resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={!valid}
          className={`w-full py-2 rounded-full font-semibold transition ${
            valid
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {t("createParking.buttons.save")}
        </button>
      </div>
    </form>
  );
};
