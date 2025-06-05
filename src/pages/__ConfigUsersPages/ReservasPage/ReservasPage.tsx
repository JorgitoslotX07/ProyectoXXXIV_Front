import { type FC, type ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGetTok, httpPatchTok } from "../../../utils/apiService";
import type { ReservaDetalle } from "../../../interfaces/ReservaProps";
import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import { createEmptyPage, type PageProps } from "../../../interfaces/PageProps";

export const ReservasPage: FC = (): ReactElement => {
  const [reservas, setReservas] = useState<PageProps<ReservaDetalle>>(
    createEmptyPage<ReservaDetalle>()
  );
  const navigate = useNavigate();

  const fetchReservas = async () => {
    try {
      const data = await httpGetTok<PageProps<ReservaDetalle>>(`/reservas`);
      console.log(data);
      if (data) setReservas(data);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  function colorPorEstado(estado: string): string {
    switch (estado) {
      case "CONFIRMADA":
        return "text-green-400";
      case "FINALIZADA":
        return "text-gray-400";
      case "CANCELADA":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  }

  return (
    <FondoPanelComponent>
      <div className="relative min-h-screen  p-8 text-white">
        <TituloComponent titulo={"Mis Reservas"} />

        <div className="max-w-4xl mx-auto w-full mt-20">
          {reservas.content.length === 0 ? (
            <p className="text-gray-400">No tienes reservas activas.</p>
          ) : (
            <div className="space-y-4">
              {reservas.content.map((reserva) => (
                <div
                  key={reserva.id}
                  className="bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95"
                  onClick={() => reserva.estado == "CONFIRMADA" || navigate(`/panel/viajes/detalle`, { state: reserva.viaje.id })}
                >
                  <div className="p-4  space-y-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        {`${reserva.vehiculo.marca} ${reserva.vehiculo.modelo}`}
                      </h2>
                      <p
                        className={`text-sm font-medium ${colorPorEstado(
                          reserva.estado
                        )}`}
                      >
                        Estado: {reserva.estado}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium text-gray-500">
                          Fecha Reserva:
                        </span>{" "}
                        {new Date(reserva.fechaReserva).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium text-gray-500">
                          Parking Recogida:
                        </span>{" "}
                        {reserva.parkingRecogida.name}
                      </p>

                    </div>
                  </div>
                  {reserva.estado == "PENDIENTE" && (
                    <div className="flex space-x-2 mt-4">
                      <button
                        type="button"
                        className="flex-1 bg-green-400/10 hover:bg-green-600/20 text-sm font-medium text-white rounded-lg px-3 py-2 border border-white/20 transition"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await httpPatchTok("/reservas/" + reserva.id + "/confirmar", {})
                          await fetchReservas()
                        }}
                      >
                        Confirmar
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-red-400/10 hover:bg-red-600/20 text-sm font-medium text-white rounded-lg px-3 py-2 border border-white/20 transition"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await httpPatchTok("/reservas/" + reserva.id + "/cancelar", {})
                          await fetchReservas()
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </FondoPanelComponent>
  );
};
