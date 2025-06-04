import { type FC, type ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGetTok } from "../../../utils/apiService";
import type { ReservaDetalle } from "../../../interfaces/ReservaProps";
import { FondoPanelComponent } from "../../../components/__ConfigUser/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../../components/__ConfigUser/PanelComonent/TituloComponent";
import { UsuarioMe } from "../../../interfaces/Usuario";
import { createEmptyPage, type PageProps } from "../../../interfaces/PageProps";

export const ReservasPage: FC = (): ReactElement => {
  const [usuario, setUsuario] = useState<UsuarioMe>(UsuarioMe);
  const [reservas, setReservas] = useState<PageProps<ReservaDetalle>>(
    createEmptyPage<ReservaDetalle>()
  );
  const navigate = useNavigate();

  usuario.username = "Jorgito2";
  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioMe>("/usuarios/me");
      if (data) {
        setUsuario(data);
        console.log(usuario);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await httpGetTok<PageProps<ReservaDetalle>>(`/reservas`);
        console.log(data);
        if (data) setReservas(data);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      }
    };

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
                  onClick={() => navigate(`/panel/reservas/${reserva.id}`)}
                >
                  <div className="p-4  space-y-2">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        {`${reserva.vehiculoMarca} ${reserva.vehiculoModelo}`}
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
                          Inicio Viaje:
                        </span>{" "}
                        {new Date(
                          reserva.fechaInicioViaje
                        ).toLocaleDateString()}
                      </p>
                      {reserva.fechaFinViaje && (
                        <p>
                          <span className="font-medium text-gray-500">
                            Fin Viaje:
                          </span>{" "}
                          {new Date(reserva.fechaFinViaje).toLocaleDateString()}
                        </p>
                      )}
                      {reserva.kmRecorridosViaje !== null && (
                        <p>
                          <span className="font-medium text-gray-500">
                            Km Recorridos:
                          </span>{" "}
                          {reserva.kmRecorridosViaje}
                        </p>
                      )}
                      <p>
                        <span className="font-medium text-gray-500">
                          Parking Recogida:
                        </span>{" "}
                        {reserva.parkingRecogidaNombre}
                      </p>
                      <p>
                        <span className="font-medium text-gray-500">
                          Parking Devolución:
                        </span>{" "}
                        {reserva.parkingDevolucionNombre}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </FondoPanelComponent>
  );
};
