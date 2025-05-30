import type { FC } from "react";
import type { BotonAgregarProps } from "../../../interfaces/BotonAgregarProps";

export const BotonAgregarComponent: FC<BotonAgregarProps> = ({ text, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        {text}
    </button>
)