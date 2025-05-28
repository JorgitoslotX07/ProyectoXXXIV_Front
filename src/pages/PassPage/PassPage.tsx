import { useState, type FC } from "react";
import { FondoPanelComponent } from "../../components/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../components/PanelComonent/TituloComponent";

export const PassPage: FC = () => {
    const [step, setStep] = useState<"email" | "codigo" | "nueva">("email");
    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const enviarEmail = async () => {
        // Aquí deberías hacer un POST al backend para enviar el código
        console.log("Email enviado a:", email);
        setStep("codigo");
    };

    const verificarCodigo = async () => {
        // Aquí deberías verificar el código con el backend
        console.log("Código ingresado:", codigo);
        setStep("nueva");
    };

    const cambiarPassword = async () => {
        if (password !== confirmPassword) {
            setMensaje("Las contraseñas no coinciden.");
            return;
        }

        // Aquí deberías hacer un POST con el código y la nueva contraseña
        console.log("Contraseña actualizada para:", email);
        setMensaje("Contraseña actualizada correctamente.");
    };

    return (
        // <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4 text-white">
        //   <div className="bg-[#1f2937] border border-gray-700 rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6">
        //     <h1 className="text-2xl font-bold text-center">Cambiar Contraseña</h1>

        //     {step === "email" && (
        //       <>
        //         <p className="text-sm text-gray-300 mb-2">
        //           Ingresa tu correo electrónico. Te enviaremos un código de verificación.
        //         </p>
        //         <input
        //           type="email"
        //           className="w-full px-4 py-2 rounded-lg bg-[#111827] text-white border border-gray-600 focus:outline-none"
        //           placeholder="Tu correo"
        //           value={email}
        //           onChange={(e) => setEmail(e.target.value)}
        //         />
        //         <button
        //           onClick={enviarEmail}
        //           className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-2 w-full rounded-lg"
        //         >
        //           Enviar código
        //         </button>
        //       </>
        //     )}

        //     {step === "codigo" && (
        //       <>
        //         <p className="text-sm text-gray-300 mb-2">
        //           Ingresa el código que recibiste en tu correo.
        //         </p>
        //         <input
        //           type="text"
        //           className="w-full px-4 py-2 rounded-lg bg-[#111827] text-white border border-gray-600 focus:outline-none"
        //           placeholder="Código de verificación"
        //           value={codigo}
        //           onChange={(e) => setCodigo(e.target.value)}
        //         />
        //         <button
        //           onClick={verificarCodigo}
        //           className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2 w-full rounded-lg"
        //         >
        //           Verificar código
        //         </button>
        //       </>
        //     )}

        //     {step === "nueva" && (
        //       <>
        //         <p className="text-sm text-gray-300 mb-2">Ingresa tu nueva contraseña.</p>
        //         <input
        //           type="password"
        //           className="w-full px-4 py-2 rounded-lg bg-[#111827] text-white border border-gray-600 focus:outline-none mb-3"
        //           placeholder="Nueva contraseña"
        //           value={password}
        //           onChange={(e) => setPassword(e.target.value)}
        //         />
        //         <input
        //           type="password"
        //           className="w-full px-4 py-2 rounded-lg bg-[#111827] text-white border border-gray-600 focus:outline-none"
        //           placeholder="Confirmar contraseña"
        //           value={confirmPassword}
        //           onChange={(e) => setConfirmPassword(e.target.value)}
        //         />
        //         <button
        //           onClick={cambiarPassword}
        //           className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-2 w-full rounded-lg mt-3"
        //         >
        //           Cambiar contraseña
        //         </button>
        //         {mensaje && <p className="text-sm text-red-400 mt-2">{mensaje}</p>}
        //       </>
        //     )}
        //   </div>
        // </div>

        <FondoPanelComponent>
            <div className="relative min-h-screen  p-8 text-white">
                <TituloComponent titulo={"Verificar Identidad"} />

                {/* <div className="max-w-2xl mt-20 mx-auto w-full bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 cursor-pointer"> */}
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 p-8 w-full max-w-md mt-40 space-y-6 mx-auto">

                    {step === "email" && (
                        <>
                            <p className="text-sm text-gray-300 mb-2">
                                Ingresa tu correo electrónico. Te enviaremos un código de verificación.
                            </p>
                            <input
                                type="email"
                                className="w-full px-4 py-2 rounded-lg bg-[#111827] text-white border border-gray-600 focus:outline-none"
                                placeholder="Tu correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                onClick={enviarEmail}
                                className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-2 w-full rounded-lg"
                            >
                                Enviar código
                            </button>
                        </>
                    )}

                    {step === "codigo" && (
                        <>
                            <p className="text-sm text-gray-300 mb-2">
                                Ingresa el código que recibiste en tu correo.
                            </p>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg bg-[#111827] text-white border border-gray-600 focus:outline-none"
                                placeholder="Código de verificación"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <button
                                onClick={verificarCodigo}
                                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2 w-full rounded-lg"
                            >
                                Verificar código
                            </button>
                        </>
                    )}

                    {step === "nueva" && (
                        <>
                            <p className="text-sm text-gray-300 mb-2">Ingresa tu nueva contraseña.</p>
                            <input
                                type="password"
                                className="w-full px-4 py-2 rounded-lg bg-[#111827] text-white border border-gray-600 focus:outline-none mb-3"
                                placeholder="Nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                className="w-full px-4 py-2 rounded-lg bg-[#111827] text-white border border-gray-600 focus:outline-none"
                                placeholder="Confirmar contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                onClick={cambiarPassword}
                                className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-2 w-full rounded-lg mt-3"
                            >
                                Cambiar contraseña
                            </button>
                            {mensaje && <p className="text-sm text-red-400 mt-2">{mensaje}</p>}
                        </>
                    )}
                </div>
            </div>
        </FondoPanelComponent>
    );
};
