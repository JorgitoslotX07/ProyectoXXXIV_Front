import type { FC } from "react";
import type { ModalBaseProps } from "../../interfaces/ModalProps";

export const ModalBaseComponent: FC<ModalBaseProps> = ({ onClose, children, titulo }) => (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#1f2937] rounded-2xl border border-white/10 shadow-lg w-full max-w-xl text-white">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold">{titulo}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);