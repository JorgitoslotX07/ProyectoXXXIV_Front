import type { FC } from "react";

export const FooterComponent: FC = () => {
    const listaUl = [
        ["Atención al cliente", "Devoluciones y garantía", "Pagos", "Condiciones de servicio", "Política de privacidad"],
        ["Información corporativa", "Sobre nosotros", "Marcas", "Afiliados", "Inversores", "Cookies"],


    ];

    return (
        <>
            <div className="flex justify-between px-60 py-12 mt-20 shadow-md bg-gray-200">


                {listaUl.map((seccion, index) => (
                    <div key={index}>
                        <ul className="flex flex-col space-y-1.5 text-gray-500 font-medium">
                            <li className="hover:text-black cursor-pointer text-gray-900 text-lg">{seccion[0]}</li>
                            {seccion.slice(1).map((item, idx) => (
                                <li key={idx} className="hover:text-black cursor-pointer">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
};
