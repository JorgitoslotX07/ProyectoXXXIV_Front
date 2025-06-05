import { useState, type FC, useEffect } from "react";
import type { UsuarioCarnet } from "../../../interfaces/Usuario";
import type { ModoClaroProps } from "../../../interfaces/ModoClaroProps";
import {
  httpDeleteTok,
  httpGetTok,
  httpPutTok,
} from "../../../utils/apiService";
import { useTranslation } from "react-i18next";
import { ImagenCarnet } from "../../../components/__ConfigUser/ImagenCarnetComponent/ImagenCarnetComponent";
import type { CarnetRequest, CarnetResponse } from "../../../interfaces/Carnets";

export const ValidacionCarnetAdminPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  const { t } = useTranslation();
  const [usuarios, setUsuarios] = useState<CarnetResponse[]>([]);
  const [usuariosEditables, setUsuariosEditables] = useState<Record<string, CarnetRequest>>({});

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarnetsConImagen = async () => {
      try {
        const data = await httpGetTok<CarnetResponse[]>("/carnets",);
        // console.log(data, "data")
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

  // useEffect(() => {
  //   const inicial = Object.fromEntries(usuarios.map(u => [u.usuarioId!, { ...u }]));
  //   setUsuariosEditables(inicial);
  // }, [usuarios]);

  useEffect(() => {
    const inicial: Record<string, CarnetRequest> = {};
    usuarios.forEach((u) => {
      const key = u.usuarioId.toString();
      inicial[key] = {
        dni: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        fechaEmision: "",
        fechaCaducidad: "",
      };
    });
    setUsuariosEditables(inicial);
  }, [usuarios]);

  const handleChange = (
    usuarioIdStr: string,
    campo: keyof CarnetRequest,
    valor: string
  ) => {
    setUsuariosEditables((prev) => ({
      ...prev,
      [usuarioIdStr]: {
        ...prev[usuarioIdStr],
        [campo]: valor,
      },
    }));
  };


  const handleValidar = async (usuId: number) => {
    try {
      const datos = usuariosEditables[usuId.toString()];

      await httpPutTok(`/carnets/validar/${usuId}`, datos);

      setUsuarios((prev) => prev.filter((u) => u.usuarioId !== usuId));
    } catch (error) {
      console.error("Error al validar carnet:", error);
    }
  };

  const handleBorar = async (usuId: number) => {
    try {
      await httpDeleteTok(`/carnets/${usuId}`);

      setUsuarios((prev) => prev.filter((u) => u.usuarioId !== usuId));
    } catch (error) {
      console.error("Error al validar carnet:", error);
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${modoClaro
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
      className={`min-h-screen p-8 ${modoClaro
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
              className={`p-6 rounded-2xl flex flex-col lg:flex-row gap-6 border ${modoClaro
                ? "bg-white shadow-md border-gray-300"
                : "bg-white/5 backdrop-blur-md border-white/10"
                }`}
            >
              <div className="w-full lg:w-1/3">
                {u.imagenUrl ? (
                  <ImagenCarnet modoClaro={modoClaro} nombre={u.usuarioId.toString()} ruta={u.imagenUrl} />
                ) : (
                  <div
                    className={`w-full h-64 rounded-lg animate-pulse ${modoClaro ? "bg-gray-200" : "bg-gray-700"
                      }`}
                  ></div>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="DNI:"
                  value={usuariosEditables[u.usuarioId!]?.dni || ""}
                  onChange={(e) => handleChange(u.usuarioId.toString()!, "dni", e.target.value)}
                  className="bg-transparent border border-white/20 rounded px-2 py-1 w-full"
                />

                <input
                  type="text"
                  placeholder="Nombre:"
                  value={usuariosEditables[u.usuarioId!]?.nombre || ""}
                  onChange={(e) => handleChange(u.usuarioId.toString()!, "nombre", e.target.value)}
                  className="bg-transparent border border-white/20 rounded px-2 py-1 w-full"
                />

                <input
                  type="text"
                  placeholder="Apellido:"
                  value={usuariosEditables[u.usuarioId!]?.apellido || ""}
                  onChange={(e) => handleChange(u.usuarioId.toString()!, "apellido", e.target.value)}
                  className="bg-transparent border border-white/20 rounded px-2 py-1 w-full"
                />

                <input
                  type="date"
                  placeholder="Fecha de Nacimiento:"
                  value={usuariosEditables[u.usuarioId.toString()!]?.fechaNacimiento || ""}
                  onChange={(e) => handleChange(u.usuarioId.toString()!, "fechaNacimiento", e.target.value)}
                  className="bg-transparent border border-white/20 rounded px-2 py-1 w-full"
                />

                <input
                  type="date"
                  placeholder="Fecha de Emisión:"
                  value={usuariosEditables[u.usuarioId.toString()!]?.fechaEmision || ""}
                  onChange={(e) => handleChange(u.usuarioId.toString()!, "fechaEmision", e.target.value)}
                  className="bg-transparent border border-white/20 rounded px-2 py-1 w-full"
                />

                <input
                  type="date"
                  placeholder="Fecha de Caducidad:"
                  value={usuariosEditables[u.usuarioId.toString()!]?.fechaCaducidad || ""}
                  onChange={(e) => handleChange(u.usuarioId.toString()!, "fechaCaducidad", e.target.value)}
                  className="bg-transparent border border-white/20 rounded px-2 py-1 w-full"
                />

                
                
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleValidar(u.usuarioId)}
                      className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-full text-white font-semibold"
                    >
                      {t("carnet.actions.approve")}
                    </button>
                    <button
                      onClick={() => handleBorar(u.usuarioId)}
                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-full text-white font-semibold"
                    >
                      {t("carnet.actions.reject")}
                    </button>
                  </div>
                
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
