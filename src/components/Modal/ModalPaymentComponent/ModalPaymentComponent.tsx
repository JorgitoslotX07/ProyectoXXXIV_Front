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

    const precioTiempo = duration * 5; // 10€/hora
    const km = estimatedKm ?? 10; // si no se introduce, usar 10 por defecto
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
    const response = await httpPostTok("/reservas", {
      vehiculoId: vehicle.id,
      parkingRecogidaId: 1,
    });
    console.log(response);

    // onSubmit({
    //   vehicleId: vehicle.id,
    //   paymentType,
    //   paymentMethod,
    //   amount,
    //   duration,
    // });

    // response && navigate("/catalog");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 md:mx-0 overflow-hidden">
        {/* Encabezado */}
        <div className="bg-indigo-600 flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Reserva</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-indigo-200"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          {/* Información del vehículo */}
          <section className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">
              Información del vehículo
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong className="text-gray-800">iD:</strong> {vehicle.id}
              </li>
              <li>
                <strong className="text-gray-800">Marca:</strong>{" "}
                {vehicle.marca}
              </li>
              <li>
                <strong className="text-gray-800">Modelo:</strong>{" "}
                {vehicle.modelo}
              </li>
              <li>
                <strong className="text-gray-800">Autonomía:</strong>{" "}
                {vehicle.autonomia} km
              </li>
              <li>
                <strong className="text-gray-800">Tarifa por hora:</strong> 10€
                {vehicle.tarifaHora}
              </li>
              <li>
                <strong className="text-gray-800">Tarifa por km:</strong>{" "}
                {tarifaPorKm}€
              </li>
            </ul>
          </section>

          {/* Duración */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              {durationLabel}
            </label>
            <input
              type="number"
              id="duration"
              min={1}
              value={duration}
              disabled={durationDisabled}
              onChange={(e) => setDuration(Number(e.target.value))}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${durationDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                } text-gray-800`}
            />
            {paymentType === ("Reservación" as PaymentType) && (
              <p className="mt-2 text-sm text-gray-600">
                Anticipo fijo de 20% de la tarifa diaria:{" "}
                <span className="font-medium">
                  €{(vehicle.tarifaDia * 0.2).toFixed(2)}
                </span>
              </p>
            )}
          </div>

          {/* Kilómetros estimados opcionales */}
          <div>
            <label
              htmlFor="km"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Kilómetros estimados (opcional)
            </label>
            <input
              type="number"
              id="km"
              min={0}
              value={estimatedKm ?? ""}
              onChange={(e) =>
                setEstimatedKm(
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              placeholder="Ej. 15"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
            />
            <p className="text-sm text-gray-500 mt-1">
              Si no introduces nada, se estimarán 10 km por defecto.
            </p>
          </div>

          {/* Monto aproximado */}
          <div>
            <p className="text-lg font-semibold text-gray-800">
              Importe aproximado:{" "}
              <span className="text-indigo-600">€{amount.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={async () => await peticionReserva()}
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};
