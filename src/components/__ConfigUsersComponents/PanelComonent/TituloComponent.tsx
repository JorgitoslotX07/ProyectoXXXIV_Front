import type { FC } from "react";
import type { TituloProps } from "../../interfaces/PanelProps";
import { VolverComonent } from "./VolverComponent";

export const TituloComponent: FC<TituloProps> = ({ titulo, runtaOut = "*"}) => {

    return (
        <div className="relative flex items-center justify-between mb-6">
            <div className="z-10">
                <VolverComonent url={runtaOut} />
            </div>

            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl text-center font-bold text-purple-300">
                {titulo}
            </h1>
        </div>
    );
}