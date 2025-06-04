import type { FC } from "react";
import type { FondoPanelProps } from "../../../interfaces/FondoPanelProps";


export const FondoPanelComponent: FC<FondoPanelProps> = ({ children, modoClaro }) => {
  return (
    <div
      className={`relative min-h-screen transition-all duration-300 ${
        modoClaro
          ? "bg-gradient-to-br from-[#f9ffce] to-[#e2e8f0]"
          : "bg-gradient-to-br from-[#0f172a] to-[#1e293b]"
      }`}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-300 ${
          modoClaro
            ? "bg-[url('/fondoClaro.jpg')] opacity-10"
            : "bg-[url('/fondoPanel.jpg')] opacity-25"
        }`}
      ></div>

      <div
        className={`absolute inset-0 z-0 ${
          modoClaro ? "backdrop-blur-sm" : "backdrop-blur-[2px]"
        }`}
      ></div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
