import React from "react";
import { useTranslation } from "react-i18next";
import "./SelectorLenguajeComponent.css";

export const SelectorLenguajeComponent: React.FC = () => {
  const { i18n } = useTranslation();

  const cambiarLenguaje = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng: string = e.target.value;
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-selector">
      {/* <span className="language-icon">🌐</span> */}
      <select
        className="language-select text-dark"
        value={i18n.language}
        onChange={cambiarLenguaje}
      >
        <option value="en" className="dark:text-white">
          En
        </option>
        <option value="es" className="dark:text-white">
          Es
        </option>
        <option value="ca" className="dark:text-white">
          Ca
        </option>
      </select>
    </div>
  );
};
