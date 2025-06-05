import { useState, type FC } from "react";

interface ModalPagarProps {
  km: number;
  tiempo: number; // en horas o el tiempo que uses
  importe: number;
  onClose: () => void;
  onConfirm: (metodoPago: string) => void;
  modoClaro: boolean;
}

export const ModalPagarComponent: FC<ModalPagarProps> = ({
  km,
  tiempo,
  importe,
  onClose,
  onConfirm,
  modoClaro
}) => {
  const [metodoPago, setMetodoPago] = useState("Tarjeta");


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className={`rounded-2xl shadow-xl w-full max-w-md mx-4 md:mx-0 overflow-hidden ${modoClaro ? "bg-white border border-gray-300" : "bg-black/50 backdrop-blur-md border border-white/10"}`}>

        <div className="bg-[#C4B5FD]/80 flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Resumen de pago</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-indigo-200 text-lg"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <div className={`p-6 space-y-6 ${modoClaro ? "text-gray-800" : "text-white"}`}>
          <div>
            <p><strong>Kilómetros:</strong> {km} km</p>
            <p><strong>Tiempo:</strong> {tiempo} horas</p>
            <p className="text-lg font-semibold mt-3">
              Importe a pagar: <span className="text-indigo-600 dark:text-indigo-300">{importe} €</span>
            </p>
          </div>

          <div>
            <label htmlFor="metodoPago" className="block mb-2 font-medium text-indigo-700 dark:text-indigo-300">
              Método de pago
            </label>
            <select
              id="metodoPago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className={`w-full rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${modoClaro ? "bg-white border border-gray-300 text-gray-800" : "bg-white/10 text-white border border-white/20"}`}
            >
              <option value="Tarjeta">Tarjeta de crédito/débito</option>
              <option value="PayPal">PayPal</option>
              <option value="Bizum">Bizum</option>
              <option value="Transferencia">Transferencia bancaria</option>
            </select>
          </div>
        </div>

        <div className={`flex justify-end space-x-4 px-6 py-4 border-t ${modoClaro ? "border-gray-200 bg-gray-50" : "border-white/10 bg-white/5"}`}>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(metodoPago)}
            className="px-5 py-2 bg-[#C4B5FD]/80 hover:bg-[#C4B5FD]/50 text-white rounded-md font-semibold transition"
          >
            Confirmar pago
          </button>
        </div>
      </div>
    </div>

  );
};
