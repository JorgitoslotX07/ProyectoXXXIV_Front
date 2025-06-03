import { useState, type FC } from "react";

interface ModalPagarProps {
  km: number;
  tiempo: number; // en horas o el tiempo que uses
  importe: number;
  onClose: () => void;
  onConfirm: (metodoPago: string) => void;
}

export const ModalPagarComponent: FC<ModalPagarProps> = ({
  km,
  tiempo,
  importe,
  onClose,
  onConfirm,
}) => {
  const [metodoPago, setMetodoPago] = useState("Tarjeta");

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 md:mx-0 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Resumen de pago</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-indigo-200"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6 text-gray-800">
          <div>
            <p>
              <strong>Kilómetros:</strong> {km} km
            </p>
            <p>
              <strong>Tiempo:</strong> {tiempo} horas
            </p>
            <p className="text-lg font-semibold mt-3">
              Importe a pagar:{" "}
              <span className="text-indigo-600">€{importe.toFixed(2)}</span>
            </p>
          </div>

          <div>
            <label
              htmlFor="metodoPago"
              className="block mb-2 font-medium text-gray-700"
            >
              Método de pago
            </label>
            <select
              id="metodoPago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Tarjeta">Tarjeta de crédito/débito</option>
              <option value="PayPal">PayPal</option>
              <option value="Bizum">Bizum</option>
              <option value="Transferencia">Transferencia bancaria</option>
            </select>
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
            onClick={() => onConfirm(metodoPago)}
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Confirmar pago
          </button>
        </div>
      </div>
    </div>
  );
};
