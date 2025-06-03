import { useEffect, useState, type FC } from "react";
import { ModalPagarComponent } from "../../components/Modal/ModalPagarComponent/ModalPagarComponent";
import { httpGet } from "../../utils/apiService";
import type { Vehiculo } from "../../interfaces/Vehiculo";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const FinishTripPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [km, setKm] = useState(15);
  const [tiempo, setTiempo] = useState(2);
  const [importe, setImporte] = useState(50);
  const vehicleFromState = location.state as Vehiculo | null;
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(vehicleFromState);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    if (!vehicleFromState?.id) return;

    const fetchVehiculo = async () => {
      try {
        const data = await httpGet<Vehiculo>("/vehiculos/" + vehicleFromState.id);
        if (data) setVehiculo(data);
      } catch (error) {
        console.error("Error cargando vehículo:", error);
      }
    };

    if (!vehiculo) {
      fetchVehiculo();
    }
  }, [vehicleFromState, vehiculo]);

  // Opcional: fetch datos viaje para actualizar km, tiempo e importe
  useEffect(() => {
    async function fetchDatosViaje() {
      if (!vehiculo?.id) return;
      try {
        const data = await httpGet<{ km: number; tiempo: number; importe: number }>(`/viajes/${vehiculo.id}`);
        if (data) {
          setKm(data.km);
          setTiempo(data.tiempo);
          setImporte(data.importe);
        }
      } catch (error) {
        console.error("Error cargando datos viaje:", error);
      }
    }
    fetchDatosViaje();
  }, [vehiculo]);

  async function handlePayment(metodoPago: string) {
    console.log("Pago confirmado con método:", metodoPago);
    // Aquí integrar llamada real para procesar el pago
    setShowPaymentPopup(false);
  }

  if (!vehiculo) return <p className="text-white">{t("loadingVehicle", "Cargando vehículo...")}</p>;

  return (
    <div className="min-h-screen bg-[#111827] text-white pt-20 pb-32 px-6 md:px-10 font-sans">
      <div className="max-w-3xl mx-auto bg-[rgba(31,41,55,0.6)] p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-[#C4B5FD] mb-4 text-center">{t("finishTrip.title", "Viaje actual")}</h1>

        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-300 text-center">{t("finishTrip.thanksMessage", "Gracias por usar nuestro servicio. Puedes proceder al pago ahora")}</p>

          <img
            src={vehiculo.imagen ?? undefined}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="max-w-xs rounded-lg shadow-md"
          />

          <p className="mt-4 text-white font-medium">{vehiculo.marca} {vehiculo.modelo}</p>

          <button
            onClick={() => setShowPaymentPopup(true)}
            className="mt-6 bg-[#C4B5FD] text-black hover:bg-[#a78bfa] transition-colors font-semibold py-3 px-6 rounded-md shadow-md"
          >
            {t("finishTrip.payNow", "Pagar ahora")}
          </button>
        </div>
      </div>

      {showPaymentPopup && (
        <ModalPagarComponent
          km={km}
          tiempo={tiempo}
          importe={importe}
          onClose={() => setShowPaymentPopup(false)}
          onConfirm={handlePayment}
        />
      )}
    </div>
  );
};
