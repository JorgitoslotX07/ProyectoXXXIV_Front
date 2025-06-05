import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const flags: Record<string, string> = {
  es: "https://upload.wikimedia.org/wikipedia/commons/7/70/Flag_of_Spain_%28civil%29.svg",
  en: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
  ca: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg",
};

const nombresIdiomas: Record<string, string> = {
  es: "ESP",
  ca: "CAT",
  en: "ENG",
};

interface Props {
  modoClaro: boolean;
}

export const SelectorLenguajeComponent: React.FC<Props> = ({ modoClaro }) => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const cambiarLenguaje = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className={`w-10 h-7 border-2 rounded overflow-hidden shadow transition-all duration-300 ${
          modoClaro ? "border-gray-300" : "border-white/20"
        }`}
      >
        <img
          src={flags[i18n.language] || flags.es}
          alt={i18n.language}
          className="w-full h-full object-cover"
        />
      </button>

      {open && (
        <div
          className={`absolute left-[-20px] mt-2 w-20 rounded-md shadow-lg ring-1 ring-opacity-5 z-50 transition-all duration-300 ${
            modoClaro
              ? "bg-white ring-gray-300"
              : "bg-[#1f2937] ring-black text-white"
          }`}
        >
          {Object.entries(flags).map(([lang, url]) => (
            <button
              key={lang}
              onClick={() => cambiarLenguaje(lang)}
              className={`w-full flex items-center gap-2 px-2 py-1 text-sm font-semibold transition-colors ${
                modoClaro
                  ? `hover:bg-[#fef9c3] ${
                      i18n.language === lang ? "bg-[#e0fbea]" : ""
                    } text-[#1f2937]`
                  : `hover:bg-gray-700 ${
                      i18n.language === lang ? "bg-gray-600" : ""
                    } text-white`
              }`}
            >
              <img
                src={url}
                alt={lang}
                className="w-5 h-5 object-cover rounded"
              />
              <span>{nombresIdiomas[lang] || lang.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
