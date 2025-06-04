// import type { FC } from "react";
// import type { ModalBaseProps } from "../../../interfaces/ModalProps";

// export const ModalBaseComponent: FC<ModalBaseProps> = ({ onClose, children, titulo }) => (
//     <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//         <div className="bg-[#1f2937] rounded-2xl border border-white/10 shadow-lg w-full max-w-xl text-white">
//             <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
//                 <h2 className="text-lg font-semibold">{titulo}</h2>
//                 <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
//             </div>
//             <div className="p-6">{children}</div>
//         </div>
//     </div>
// );import type { FC } from "react";
import type { FC } from "react";
import type { ModalBaseProps } from "../../../interfaces/ModalProps";

interface Props extends ModalBaseProps {
    modoClaro: boolean;
}

export const ModalBaseComponent: FC<Props> = ({ onClose, children, titulo, modoClaro }) => (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div
            className={`rounded-2xl border shadow-lg w-full max-w-xl transition-all duration-300 ${modoClaro
                    ? "bg-[#fdf6ee] text-[#111] border-gray-300"  // ← fondo cálido claro
                    : "bg-[#1f2937] text-white border-white/10"
                }`}
        >
            <div
                className={`flex justify-between items-center px-6 py-4 border-b ${modoClaro ? "border-gray-300" : "border-white/10"
                    }`}
            >
                <h2 className="text-lg font-semibold">{titulo}</h2>
                <button
                    onClick={onClose}
                    className={`transition ${modoClaro
                            ? "text-gray-500 hover:text-black"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    ✕
                </button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);
