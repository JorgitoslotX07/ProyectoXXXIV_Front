import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { VolverProps } from "../../interfaces/VolverProps";

export const VolverComonent: FC<VolverProps> = ({url}) => {
    const navigate = useNavigate();


    return (
        <button
            type="button"
            onClick={() => navigate(url)}
            className="text-purple-400 hover:text-purple-300 text-lg flex items-center gap-1"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
        </button>
    );
}