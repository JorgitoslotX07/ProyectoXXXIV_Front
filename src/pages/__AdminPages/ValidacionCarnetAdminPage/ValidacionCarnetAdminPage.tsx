import { useState, type FC, useEffect } from "react";
import type { UsuarioCarnet } from "../../../interfaces/Usuario";
import type { ModoClaroProps } from "../../../interfaces/ModoClaroProps";
import {
  httpGetImageTok,
  httpPostTok,
  httpPutTok,
} from "../../../utils/apiService";
import { useTranslation } from "react-i18next";

export const ValidacionCarnetAdminPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  const { t } = useTranslation();
  const [usuarios, setUsuarios] = useState<UsuarioCarnet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imagenes, setImagenes] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCarnetsConImagen = async () => {
      try {
        const data = await httpPostTok<UsuarioCarnet[], {}>(
          "/carnets/conimg",
          {}
        );
        setUsuarios(data ?? []);
      } catch (error) {
        console.error("Error al obtener carnets con imagen:", error);
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCarnetsConImagen();
  }, []);

  useEffect(() => {
    const cargarImagenes = async () => {
      const nuevasImagenes: Record<string, string> = {};
      for (const u of usuarios) {
        if (u.usuario && u.imagenUrl) {
          const imgUrl = await httpGetImageTok(u.imagenUrl);
          if (imgUrl) nuevasImagenes[u.usuario] = imgUrl;
        }
      }
      setImagenes(nuevasImagenes);
    };

    if (usuarios.length > 0) {
      cargarImagenes();
    }
  }, [usuarios]);

  const handleValidar = async (usu: string, aprobado: boolean) => {
    setUsuarios((prev) => prev.filter((u) => u.usuario !== usu));
    await httpPutTok(`/carnets/${usu}/estado`, {
      estado: aprobado ? "APROBADO" : "RECHAZADO",
    });
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          modoClaro
            ? "bg-gradient-to-br from-[#FFFBEA] to-[#FDF6E3] text-gray-800"
            : "bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"
        }`}
      >
        <span className="text-xl font-semibold">{t("carnet.loading")}</span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 ${
        modoClaro
          ? "bg-gradient-to-br from-[#FFFBEA] to-[#FDF6E3] text-gray-800"
          : "bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("carnet.title")}</h1>
        </div>

        <div className="space-y-6">
          {usuarios.map((u, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl flex flex-col lg:flex-row gap-6 border ${
                modoClaro
                  ? "bg-white shadow-md border-gray-300"
                  : "bg-white/5 backdrop-blur-md border-white/10"
              }`}
            >
              <div className="w-full lg:w-1/3">
                {imagenes[u.usuario!] ? (
                  <img
                    src={imagenes[u.usuario!]}
                    alt={`Carnet de ${u.nombre}`}
                    loading="lazy"
                    className={`w-full h-auto rounded-lg border ${
                      modoClaro ? "border-gray-300" : "border-white/20"
                    } object-cover`}
                  />
                ) : (
                  <div
                    className={`w-full h-64 rounded-lg animate-pulse ${
                      modoClaro ? "bg-gray-200" : "bg-gray-700"
                    }`}
                  ></div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <h2>
                  <span
                    className={`font-bold text-3xl ${
                      modoClaro ? "text-amber-600" : "text-purple-300"
                    }`}
                  >
                    {u.usuario}
                  </span>
                </h2>
                <p>
                  <span className="font-semibold">{t("carnet.fields.name")}:</span> {u.nombre}
                </p>
                <p>
                  <span className="font-semibold">{t("carnet.fields.email")}:</span> {u.email}
                </p>
                <p>
                  <span className="font-semibold">{t("carnet.fields.cardNumber")}:</span>{" "}
                  {u.numeroCarnet}
                </p>
                <p>
                  <span className="font-semibold">{t("carnet.fields.issueDate")}:</span>{" "}
                  {new Date(u.fechaExpedicion).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">{t("carnet.fields.status")}:</span>{" "}
                  <span
                    className={
                      u.estado === "PENDIENTE"
                        ? "text-yellow-500"
                        : u.estado === "APROBADO"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {t(`carnet.status.${u.estado.toLowerCase()}`)}
                  </span>
                </p>
                {u.estado === "PENDIENTE" && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleValidar(u.usuario, true)}
                      className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-full text-white font-semibold"
                    >
                      {t("carnet.actions.approve")}
                    </button>
                    <button
                      onClick={() => handleValidar(u.usuario, false)}
                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-full text-white font-semibold"
                    >
                      {t("carnet.actions.reject")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {usuarios.length === 0 && (
            <p className={modoClaro ? "text-gray-600" : "text-gray-400"}>
              {t("carnet.noPending")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
