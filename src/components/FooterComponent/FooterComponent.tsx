import { useState, type FC } from "react";
import Stepper from "../StepperComponent/StepperComponent";
import { Step } from "../StepperComponent/StepperSubComponents";
import { Link } from "react-router-dom"

const enlaces: Record<string, string> = {
    "Cookies": "/cookies",
    // "Política de privacidad": "/privacidad",
    // "Condiciones de servicio": "/condiciones",
    // "FAQs": "/faq",
    // "Blog": "/blog",
    // "Sobre nosotros": "/sobre-nosotros",
    // "Soporte Técnico": "/soporte",
};

export const FooterComponent: FC = () => {
    const listaUl = [
        ["Atención al cliente", "Devoluciones y garantía", "Pagos", "Condiciones de servicio", "Política de privacidad"],
        ["Información corporativa", "Sobre nosotros", "Marcas", "Afiliados", "Inversores", "Cookies"],
        ["Recursos", "Blog", "FAQs", "Soporte Técnico", "Foro"],
    ];

    const [mostrarModal, setMostrarModal] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <>
            <div className="flex justify-between px-20 py-12 bg-[#090c10] shadow-lg text-gray-300 flex-wrap gap-10">
                {listaUl.map((seccion, index) => (
                    <div key={index} className="min-w-[160px]">
                        <ul className="flex flex-col space-y-2">
                            <li className="text-white font-semibold text-lg mb-4 cursor-default">
                                {seccion[0]}
                            </li>
                            {seccion.slice(1).map((item, idx) => (
                                <li
                                    key={idx}
                                    className="hover:text-white cursor-pointer transition-colors duration-200"
                                >
                                    {enlaces[item] ? (
                                        <Link to={enlaces[item]} className="hover:underline">
                                            {item}
                                        </Link>
                                    ) : (
                                        item
                                    )}
                                </li>
                            ))}

                        </ul>
                    </div>
                ))}

                <div className="min-w-[280px]">
                    <h3 className="text-white font-semibold text-lg mb-4 cursor-default">
                        Contacto directo
                    </h3>
                    <button
                        onClick={() => setMostrarModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Contactar
                    </button>
                </div>
            </div>

            {/* Popup modal */}
            {mostrarModal && (
                <div className="fixed inset-0 backdrop-blur-[5px] bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-[#1F2937] rounded-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setMostrarModal(false)}
                            className="absolute top-2 right-2 text-white font-bold text-xl hover:text-red-500"
                        >
                            ×
                        </button>

                        <Stepper
                            initialStep={1}
                            onFinalStepCompleted={() => setMostrarModal(false)}
                            nextButtonText="Siguiente"
                            backButtonText="Anterior"
                            nextButtonProps={{
                                className: "text-white" // esto sobrescribe el texto
                            }}
                            backButtonProps={{
                                className: "text-white"
                            }}
                            contentClassName="text-white"
                            footerClassName="mt-6"
                            stepCircleContainerClassName="bg-transparent"
                            stepContainerClassName="justify-center"
                        >
                            <Step>
                                <h2 className="text-xl font-semibold">Paso 1</h2>
                                <p>¿Quieres que te contactemos?</p>
                            </Step>
                            <Step>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Tu correo electrónico"
                                    className="w-full mt-2 p-2 border rounded"
                                />
                            </Step>
                            <Step>
                                <p className="text-center text-green-300">¡Gracias por tu interés!</p>
                                <p className="text-center text-green-300">La solicitud se ha mandado correctamente</p>
                            </Step>
                        </Stepper>
                    </div>
                </div>
            )}
        </>
    );
};
