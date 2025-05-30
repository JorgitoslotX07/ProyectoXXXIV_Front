import { useState, type FC } from "react";
import { useSearchParams } from "react-router-dom";
import { httpPost } from "../../../utils/apiService";
import { mostrarError, mostrarSuccess } from "../../../utils/notiToast";
import { FondoPanelComponent } from "../../../components/__ConfigUsersComponents/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUsersComponents/PanelComonent/TituloComponent";
import { NotiToastComponent } from "../../../components/NotiToastComponents/NotiToastComponet";

export const PassPage: FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [step, setStep] = useState<"email" | "codigo" | "nueva">(
    token === null ? "email" : "nueva"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const enviarEmail = async () => {
    setStep("codigo");

    const data = await httpPost<string, { email: string }>(
      "/auth/contrasenya-olvidada",
      { email: email }
    );
    console.log(data);
    mostrarSuccess("Email Enviado con exito.\nVerifique su correo");
    console.log("Email enviado a:", email);
  };

  const cambiarPassword = async () => {
    if (password !== confirmPassword) {
      mostrarError("Las contraseñas no coinciden.");
      return;
    }
    if (token !== null) {
      const data = await httpPost<
        string,
        { token: string; contrasenyaNueva: string }
      >("/auth/cambiar-contrasenya", {
        token: token,
        contrasenyaNueva: password,
      });
      console.log(data);

      console.log("Contraseña actualizada para:", email);
      mostrarSuccess("Contraseña actualizada correctamente.");
    }
  };

  return (
    <FondoPanelComponent>
      <div className="relative min-h-screen  p-8 text-white">
        <TituloComponent titulo={"Verificar Identidad"} />

        {/* <div className="max-w-2xl mt-20 mx-auto w-full bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 cursor-pointer"> */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 p-8 w-full max-w-md mt-40 space-y-6 mx-auto">
          {step === "email" && (
            <>
              <p className="text-sm text-gray-300 mb-2">
                Ingresa tu correo electrónico. Te enviaremos un link para
                cambiar su contraseña .
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
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-2 animate-pulse">
                <svg
                  className="h-4 w-4 text-purple-400 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>
                  Procesando... este proceso puede tardar unos minutos.
                </span>
              </div>
            </>
          )}

          {step === "nueva" && (
            <>
              <p className="text-sm text-gray-300 mb-2">
                Ingresa tu nueva contraseña.
              </p>
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
              {/* {mensaje && (
                <p className="text-sm text-red-400 mt-2">{mensaje}</p>
              )} */}
            </>
          )}
        </div>
      </div>
      <NotiToastComponent />
    </FondoPanelComponent>
  );
};
