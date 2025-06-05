import { useEffect, useState, type FC } from "react";
import type {
  // PaymentMethod,
  PaymentType,
} from "../../../interfaces/PaymentProps";
import type { ModalPayment } from "../../../interfaces/ModalProps";
// import { useNavigate } from "react-router-dom";
import { httpPostTok } from "../../../utils/apiService";
import { useNavigate } from "react-router-dom";

export const ModalPaymentComponent: FC<ModalPayment> = ({
  onClose,
  vehicle,
  initialDuration = 1,
  modoClaro
  // onSubmit,
}) => {
  const paymentType: PaymentType = "Alquiler por hora";
  // const paymentMethod: PaymentMethod = "Tarjeta";
  const [duration, setDuration] = useState<number>(initialDuration);
  const [estimatedKm, setEstimatedKm] = useState<number | undefined>(undefined);
  const [amount, setAmount] = useState<number>(0);
  // const [reserva, setReserva] =useState<number>(0);

  const navigate = useNavigate();



  // useEffect(() => {
  //   peticionReserva();
  // }, []);

  // const navigate = useNavigate();

  const tarifaPorKm = (() => {
    switch (vehicle.tipo) {
      case "TURISMO":
        return 0.5;
      case "SUV":
        return 0.7;
      case "BIPLAZA":
        return 0.4;
      case "MONOVOLUMEN":
        return 0.6;
      default:
        return 0.5;
    }
  })();

  useEffect(() => {
    let precioPorKm = 0.5; // fallback
    switch (vehicle.tipo) {
      case "TURISMO":
        precioPorKm = 0.5;
        break;
      case "SUV":
        precioPorKm = 0.7;
        break;
      case "BIPLAZA":
        precioPorKm = 0.4;
        break;
      case "MONOVOLUMEN":
        precioPorKm = 0.6;
        break;
    }

    const precioTiempo = duration * 5;
    const km = estimatedKm ?? 10;
    const precioEstimado = (precioTiempo + km * precioPorKm) + 10;

    setAmount(precioEstimado);
  }, [duration, estimatedKm, paymentType, vehicle]);

  const durationLabel =
    paymentType === "Alquiler por hora"
      ? "Duración (horas)"
      : paymentType === "Alquiler por día"
        ? "Duración (días)"
        : "Duración no aplicable";

  const durationDisabled = paymentType === ("Reservación" as PaymentType);

  async function peticionReserva() {
    try {
      const response = await httpPostTok("/reservas", {
        vehiculoId: vehicle.id,
        parkingRecogidaId: 1,
      });
      console.log(response);

      navigate("/catalog");
    } catch (error) {
      console.error("Error al crear reserva:", error);
    }
  }

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className={`rounded-2xl shadow-xl w-full max-w-lg mx-4 md:mx-0 overflow-hidden ${modoClaro ? "bg-white border border-gray-300" : "bg-black/50 backdrop-blur-md border border-white/10"}`}>

        {/* Encabezado */}
        <div className="bg-[#C4B5FD]/80 flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Reserva</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#C4B5FD]/20 text-lg"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6 text-sm">

          {/* Información del vehículo */}
          <section className={`rounded-xl p-5 ${modoClaro ? "bg-gray-100 border border-gray-200" : "bg-white/10 border border-white/10 text-white"}`}>
            <h3 className="font-medium mb-3 text-indigo-400">Información del vehículo</h3>
            <ul className="space-y-1">
              <li><strong>ID:</strong> {vehicle.id}</li>
              <li><strong>Marca:</strong> {vehicle.marca}</li>
              <li><strong>Modelo:</strong> {vehicle.modelo}</li>
              <li><strong>Autonomía:</strong> {vehicle.autonomia} km</li>
              <li><strong>Tarifa por hora:</strong> €{vehicle.tarifaHora}</li>
              <li><strong>Tarifa por km:</strong> €{tarifaPorKm}</li>
            </ul>
          </section>

          {/* Duración */}
          <div>
            <label htmlFor="duration" className="block font-medium mb-1 text-indigo-700 dark:text-indigo-300">{durationLabel}</label>
            <input
              type="number"
              id="duration"
              min={1}
              value={duration}
              disabled={durationDisabled}
              onChange={(e) => setDuration(Number(e.target.value))}
              className={`w-full px-3 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none ${durationDisabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-gray-800 border-gray-300 dark:bg-white/10 dark:text-white dark:border-white/20"}`}
            />
            {paymentType === ("Reservación" as PaymentType) && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Anticipo fijo del 20% de la tarifa diaria:{" "}
                <span className="font-medium">€{(vehicle.tarifaDia * 0.2).toFixed(2)}</span>
              </p>
            )}
          </div>

          {/* Kilómetros estimados */}
          <div>
            <label htmlFor="km" className="block font-medium mb-1 text-indigo-700 dark:text-indigo-300">Kilómetros estimados (opcional)</label>
            <input
              type="number"
              id="km"
              min={0}
              value={estimatedKm ?? ""}
              onChange={(e) => setEstimatedKm(e.target.value === "" ? undefined : Number(e.target.value))}
              placeholder="Ej. 15"
              className="w-full px-3 py-2 rounded-md border shadow-sm bg-white text-gray-800 border-gray-300 focus:ring-2 focus:ring-indigo-400 dark:bg-white/10 dark:text-white dark:border-white/20"
            />
            <p className="text-sm mt-1 text-gray-500 dark:text-gray-300">
              Si no introduces nada, se estimarán 10 km por defecto.
            </p>
          </div>

          {/* Importe aproximado */}
          <div>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              Importe aproximado: <span className="text-indigo-600 dark:text-indigo-300">€{amount.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className={`flex justify-end space-x-4 px-6 py-4 border-t ${modoClaro ? "border-gray-200 bg-gray-50" : "border-white/10 bg-white/5"}`}>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={async () => await peticionReserva()}
            className="px-5 py-2 bg-[#C4B5FD] hover:bg-[#C4B5FD]/60 text-white rounded-md transition font-semibold"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>

  );
};
