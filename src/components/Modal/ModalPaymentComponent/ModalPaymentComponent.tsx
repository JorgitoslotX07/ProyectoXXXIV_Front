import { useEffect, useState, type FC } from "react";
import type { PaymentMethod, PaymentType } from "../../../interfaces/PaymentProps";
import type { ModalPayment } from "../../../interfaces/ModalProps";

export const ModalPaymentComponent: FC<ModalPayment> = ({
    onClose,
    vehicle,
    initialDuration = 1,
    onSubmit,
}) => {
    const [paymentType, setPaymentType] = useState<PaymentType>("Alquiler por hora");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Tarjeta");
    const [duration, setDuration] = useState<number>(initialDuration);
    const [amount, setAmount] = useState<number>(0);

    // Calcula el importe aproximado cada vez que cambie tipo o duración
    useEffect(() => {
        let total = 0;
        if (paymentType === "Alquiler por hora") {
            total = vehicle.tarifaHora * duration;
        } else if (paymentType === "Alquiler por día") {
            total = vehicle.tarifaDia * duration;
        } else {
            // Para "Reservación", podríamos fijar un anticipo del 20% de un día
            total = vehicle.tarifaDia * 0.2;
        }
        setAmount(Number(total.toFixed(2)));
    }, [paymentType, duration, vehicle.tarifaHora, vehicle.tarifaDia]);


    const durationLabel =
        paymentType === "Alquiler por hora"
            ? "Duración (horas)"
            : paymentType === "Alquiler por día"
                ? "Duración (días)"
                : "Duración no aplicable";

    const durationDisabled = paymentType === "Reservación";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 md:mx-0 overflow-hidden">
          {/* Encabezado */}
          <div className="bg-indigo-600 flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Realizar Pago</h2>
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
              <h3 className="font-medium text-gray-800 mb-3">Información del Vehículo</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><strong className="text-gray-800">ID:</strong> {vehicle.id}</li>
                <li><strong className="text-gray-800">Marca:</strong> {vehicle.marca}</li>
                <li><strong className="text-gray-800">Modelo:</strong> {vehicle.modelo}</li>
                <li><strong className="text-gray-800">Estado:</strong> {vehicle.estado}</li>
                <li><strong className="text-gray-800">Kilometraje:</strong> {vehicle.kilometraje} km</li>
                <li><strong className="text-gray-800">Tarifa por hora:</strong> €{vehicle.tarifaHora}</li>
                <li><strong className="text-gray-800">Tarifa por día:</strong> €{vehicle.tarifaDia}</li>
              </ul>
            </section>
  
            {/* Selección de tipo de pago */}
            <div>
              <label htmlFor="paymentType" className="block text-sm font-medium text-gray-800 mb-2">
                Tipo de pago
              </label>
              <select
                id="paymentType"
                value={paymentType}
                onChange={(e) => {
                  setPaymentType(e.target.value as PaymentType);
                  setDuration(1); // resetear duración al cambiar tipo
                }}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
              >
                <option>Alquiler por hora</option>
                <option>Alquiler por día</option>
                <option>Reservación</option>
              </select>
            </div>
  
            {/* Duración (usa un solo campo) */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-800 mb-2">
                {durationLabel}
              </label>
              <input
                type="number"
                id="duration"
                min={1}
                value={duration}
                disabled={durationDisabled}
                onChange={(e) => setDuration(Number(e.target.value))}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                  durationDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                } text-gray-800`}
              />
              {paymentType === "Reservación" && (
                <p className="mt-2 text-sm text-gray-600">
                  Anticipo fijo de 20% de la tarifa diaria:{" "}
                  <span className="font-medium">€{(vehicle.tarifaDia * 0.2).toFixed(2)}</span>
                </p>
              )}
            </div>
  
            {/* Selección de método de pago */}
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-800 mb-2">
                Método de pago
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
              >
                <option>Tarjeta</option>
                <option>PayPal</option>
                <option>Transferencia bancaria</option>
              </select>
            </div>
  
            {/* Monto aproximado */}
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Importe aproximado:{" "}
                <span className="text-indigo-600">€{amount.toFixed(2)}</span>
              </p>
            </div>
          </div>
  
          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 border-t border-gray-200 px-6 py-4 bg-gray-50">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              onClick={() =>
                onSubmit({
                  vehicleId: vehicle.id,
                  paymentType,
                  paymentMethod,
                  amount,
                  duration,
                })
              }
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Realizar Pago
            </button>
          </div>
        </div>
      </div>
    );
};