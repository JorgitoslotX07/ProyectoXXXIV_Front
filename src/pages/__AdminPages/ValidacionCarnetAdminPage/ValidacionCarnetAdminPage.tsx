import { useState, type FC, useEffect } from "react";
import type { UsuarioCarnet } from "../../../interfaces/Usuario";

const mockUsuarios: UsuarioCarnet[] = [
    {
        id: 1,
        usuario: "AnaL_67",
        nombre: "Ana López",
        email: "ana.lopez@example.com",
        numeroCarnet: "DL-12345678",
        fechaExpedicion: "2021-04-15",
        imagenCarnet: "/carnets/ana-lopez.jpg",
        estadoValidacion: "PENDIENTE",
    },
    {
        id: 2,
        usuario: "MartinaLis",
        nombre: "Luis Martínez",
        email: "luis.martinez@example.com",
        numeroCarnet: "DL-87654321",
        fechaExpedicion: "2019-09-20",
        imagenCarnet: "/carnets/luis-martinez.jpg",
        estadoValidacion: "PENDIENTE",
    },
];

export const ValidacionCarnetAdminPage: FC = () => {
    const [usuarios, setUsuarios] = useState<UsuarioCarnet[]>([]);

    useEffect(() => {
        // Simular fetch
        setUsuarios(mockUsuarios);
    }, []);

    const handleValidar = (id: number, aprobado: boolean) => {
        setUsuarios((prev) =>
            prev.map((u) =>
                u.id === id
                    ? { ...u, estadoValidacion: aprobado ? "APROBADO" : "RECHAZADO" }
                    : u
            )
        );
        // Aquí iría llamada al backend para actualizar estado
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 text-white">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Validacion de Carnet</h1>
                </div>

                <div className="space-y-6">
                    {usuarios.map((u) => (
                        <div key={u.id} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col lg:flex-row gap-6">
                            <div className="w-full lg:w-1/3">
                                <img
                                    src={u.imagenCarnet}
                                    alt={`Carnet de ${u.nombre}`}
                                    className="w-full h-auto rounded-lg border border-white/20 object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <h2><span className="font-bold text-3xl text-purple-300">{u.usuario}</span> </h2>
                                <p><span className="font-semibold">Nombre:</span> {u.nombre}</p>
                                <p><span className="font-semibold">Email:</span> {u.email}</p>
                                <p><span className="font-semibold">Nº Carnet:</span> {u.numeroCarnet}</p>
                                <p><span className="font-semibold">Expedición:</span> {new Date(u.fechaExpedicion).toLocaleDateString()}</p>
                                <p>
                                    <span className="font-semibold">Estado:</span>{" "}
                                    {u.estadoValidacion === "PENDIENTE" ? (
                                        <span className="text-yellow-400">Pendiente</span>
                                    ) : u.estadoValidacion === "APROBADO" ? (
                                        <span className="text-green-400">Aprobado</span>
                                    ) : (
                                        <span className="text-red-400">Rechazado</span>
                                    )}
                                </p>
                                {u.estadoValidacion === "PENDIENTE" && (
                                    <div className="flex gap-4 mt-4">
                                        <button
                                            onClick={() => handleValidar(u.id, true)}
                                            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-full text-white font-semibold"
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            onClick={() => handleValidar(u.id, false)}
                                            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-full text-white font-semibold"
                                        >
                                            Rechazar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {usuarios.length === 0 && <p className="text-gray-400">No hay carnets por validar.</p>}
                </div>
            </div>
        </div>
    );
}