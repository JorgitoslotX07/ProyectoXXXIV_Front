import { useState, type FC } from "react";
import Stepper from "../StepperComponent/StepperComponent";
import { Step } from "../StepperComponent/StepperSubComponents";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../../context/ThemeContext";

// ⚙️ Enlaces disponibles (ajusta las rutas según tengas en App.tsx)
const enlaces: Record<string, string> = {
    devoluciones: "/devoluciones",
    pagos: "/pagos",
    condiciones: "/condiciones",
    privacidad: "/privacidad",
    sobrenosotros: "/sobre-nosotros",
    marcas: "/marcas",
    afiliados: "/afiliados",
    inversores: "/inversores",
    blog: "/blog",
    faqs: "/faqs",
    soporte: "/soporte",
    foro: "/foro",
};

export const FooterComponent: FC = () => {
    const { t } = useTranslation();
    const { modoClaro } = useThemeContext();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [email, setEmail] = useState("");

    const listaUl = [
        ["cliente", "devoluciones", "pagos", "condiciones", "privacidad"],
        ["info", "sobrenosotros", "marcas", "afiliados", "inversores"],
        ["recursos", "blog", "faqs", "soporte", "foro"],
    ];

    return (
        <>
            <div
                className={`flex justify-between px-20 py-12 flex-wrap gap-10 shadow-lg transition-all duration-300 ${modoClaro ? "bg-[#fdfaf2] text-[#333]" : "bg-[#090c10] text-gray-300"
                    }`}
            >
                {listaUl.map((seccion, index) => (
                    <div key={index} className="min-w-[160px]">
                        <ul className="flex flex-col space-y-2">
                            <li
                                className={`font-semibold text-lg mb-4 cursor-default ${modoClaro ? "text-[#222]" : "text-white"
                                    }`}
                            >
                                {t(`footer.${seccion[0]}`)}
                            </li>
                            {seccion.slice(1).map((clave, idx) => {
                                const path = enlaces[clave];
                                const label = t(`footer.${clave}`);
                                return (
                                    <li
                                        key={idx}
                                        className={`hover:underline transition-colors duration-200 ${modoClaro ? "hover:text-black" : "hover:text-white"
                                            }`}
                                    >
                                        {path ? <Link to={path}>{label}</Link> : <span>{label}</span>}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}

                <div className="min-w-[280px]">
                    <h3
                        className={`font-semibold text-lg mb-4 cursor-default ${modoClaro ? "text-[#222]" : "text-white"
                            }`}
                    >
                        {t("footer.contactoDirecto")}
                    </h3>
                    <button
                        onClick={() => setMostrarModal(true)}
                        className={`font-semibold py-2 px-4 rounded transition ${modoClaro
                                ? "bg-yellow-400 text-[#333] hover:bg-yellow-500"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                    >
                        {t("footer.contactar")}
                    </button>
                </div>
            </div>

            {mostrarModal && (
                <div
                    className={`fixed inset-0 flex items-center justify-center z-50 transition-all ${modoClaro ? "backdrop-blur-md bg-[#f3f4f6]/60" : "backdrop-blur-md bg-black/60"
                        }`}
                >
                    <div
                        className={`rounded-lg p-6 w-full max-w-md relative transition-colors duration-300 ${modoClaro ? "bg-white text-[#333]" : "bg-[#1F2937] text-white"
                            }`}
                    >
                        <button
                            onClick={() => setMostrarModal(false)}
                            className="absolute top-2 right-2 font-bold text-xl hover:text-red-500"
                        >
                            ×
                        </button>

                        <Stepper
                            initialStep={1}
                            onFinalStepCompleted={() => setMostrarModal(false)}
                            nextButtonText={t("footer.siguiente")}
                            backButtonText={t("footer.anterior")}
                            nextButtonProps={{ className: modoClaro ? "text-[#333]" : "text-white" }}
                            backButtonProps={{ className: modoClaro ? "text-[#333]" : "text-white" }}
                            contentClassName={modoClaro ? "text-[#333]" : "text-white"}
                            footerClassName="mt-6"
                            stepCircleContainerClassName="bg-transparent"
                            stepContainerClassName="justify-center"
                        >
                            <Step>
                                <h2 className="text-xl font-semibold">{t("footer.paso1")}</h2>
                                <p>{t("footer.deseasContacto")}</p>
                            </Step>
                            <Step>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("footer.placeholderEmail")}
                                    className={`w-full mt-2 p-2 border rounded ${modoClaro ? "border-[#ccc] text-[#333]" : "border-gray-400 text-white"
                                        }`}
                                />
                            </Step>
                            <Step>
                                <p className="text-center text-green-500">{t("footer.gracias")}</p>
                                <p className="text-center text-green-500">{t("footer.enviado")}</p>
                            </Step>
                        </Stepper>
                    </div>
                </div>
            )}
        </>
    );
};
