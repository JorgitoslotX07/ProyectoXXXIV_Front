import type { FC } from "react";
import { NotiToastComponent } from "../../components/NotiToastComponents/NotiToastComponet";
import { RegisterComponent } from "../../components/Form/RegisterComponent/RegisterComponent";
import type { ModoClaroProps } from "../../interfaces/ModoClaroProps";


export const RegistroPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        modoClaro ? "bg-gradient-to-br from-[#e0fbea] to-[#fef9c3]" : "bg-[#111827]"
      }`}
    >
      <div
        className={`w-full md:w-1/2 flex items-center justify-center p-10 ${
          modoClaro
            ? "bg-white/80 border border-gray-200 text-[#1f2937]"
            : "bg-[rgba(17,25,40,0.75)] border border-[rgba(255,255,255,0.125)] text-white"
        } backdrop-blur-[16px] backdrop-saturate-[180%]`}
      >
        <div className="w-full max-w-md">
          <RegisterComponent modoClaro={modoClaro} />
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: modoClaro
            ? "url('/fondoFastSeartchClaro.jpeg')"
            : "url('/fondoFastSeartch.webp')",
        }}
      />

      <NotiToastComponent />
    </div>
  );
};
