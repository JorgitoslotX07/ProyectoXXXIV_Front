import { useEffect, useState, type FC } from "react";
import { ModalPagarComponent } from "../../components/Modal/ModalPagarComponent/ModalPagarComponent";
import { httpGet, httpGetTok } from "../../utils/apiService";
import type { Vehiculo } from "../../interfaces/Vehiculo";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { viajeInicial, type Viaje, type ViajeResumen, viajeResumenInicial } from "../../interfaces/Viaje";
import { calcularDiferenciaEnHoras } from "../../utils/conversorServise";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

export const FinishTripPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const viajeId = location.state as number | null;
  const [km, setKm] = useState(15);
  const [tiempo, setTiempo] = useState(2);
  const [importe, setImporte] = useState(50);
  const [vehiculo, setVehiculo] = useState<Vehiculo>();
  const [viaje, setViaje] = useState<Viaje>(viajeInicial);
  const [viajeResumen, setViajeResumen] = useState<ViajeResumen>(viajeResumenInicial);

  const [recenterPosition, setRecenterPosition] = useState<
    [number, number] | null
  >(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);


  const fetchVehiculo = async (v?: Viaje) => {
    const viajeParaUsar: Viaje= v ?? viaje;
    try {
      const data = await httpGet<Vehiculo>("/vehiculos/" + viajeParaUsar.vehiculo.id);
      if (data) {
        setVehiculo(data);
        setRecenterPosition([data.latitud, data.longitud]);
      }
      console.log(data, "<= DATA")
    } catch (error) {
      console.error("Error cargando vehículo:", error);
    }
  };


  const fetchViajeResumen = async () => {

    try {
      const data = await httpGetTok<ViajeResumen>("/viajes/resumen/" + viajeId);
      if (data) {
        setViajeResumen(data);
      }
      console.log(data, "<= DATA")
    } catch (error) {
      console.error("Error cargando vehículo:", error);
    }
  };


  async function fetchDatosViaje() {
    try {
      const data = await httpGetTok<Viaje>(`/viajes/${viajeId}`);
      if (data) {
      console.log(data, "<= DATA")

        setKm(data.kmRecorridos);
        const horas: number = calcularDiferenciaEnHoras(data.fechaInicio, data.fechaInicio)
        const horasRedondeadas: number = Math.round(horas * 100) / 100;
        setTiempo(horasRedondeadas);
        setImporte(data.precio);
        setViaje(data)
        await fetchVehiculo(data);
        await fetchViajeResumen();
      }
    } catch (error) {
      console.error("Error cargando datos viaje:", error);
    }
  }

  useEffect(() => {
    console.log(viajeId)
    fetchDatosViaje();
  }, [viajeId]);


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
            src={vehiculo.imagen ?? "logo.webp"}
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

       {/* Mapa con ruta del viaje */}
       {recenterPosition && viajeResumen.cods.length > 0 && (
        <div className="mt-8 max-w-3xl mx-auto h-96 rounded-2xl shadow-lg overflow-hidden">
          <MapContainer
            center={recenterPosition}
            zoom={13}
            className="w-full h-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={recenterPosition}>
              <Popup>
                {t("finishTrip.startPoint", "Punto de inicio del viaje")}
              </Popup>
            </Marker>

            {/* Polyline para la ruta utilizando las coordenadas del resumen */}
            <Polyline
              positions={viajeResumen.cods.map((coord) => [coord.lat, coord.lng])}
              pathOptions={{ color: "#22c55e", weight: 4 }}
            />

            {/* Si deseas marcar también el punto final */}
            {viajeResumen.cods.length > 1 && (
              <Marker
                position={[
                  viajeResumen.cods[viajeResumen.cods.length - 1].lat,
                  viajeResumen.cods[viajeResumen.cods.length - 1].lng,
                ]}
              >
                <Popup>
                  {t("finishTrip.endPoint", "Punto final del viaje")}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      )}
    </div>
  );
};
