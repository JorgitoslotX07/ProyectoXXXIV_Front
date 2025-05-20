import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const UserDashboard = () => {
    const navigate = useNavigate();

    const sections = [
        { icon: "🚗", title: "Mis Reservas", route: "/reservas" },
        { icon: "📍", title: "Ubicación Actual", route: "/ubicacion" },
        { icon: "💳", title: "Métodos de Pago", route: "/pagos" },
        { icon: "🕒", title: "Historial de Viajes", route: "/historial" },
        { icon: "🔒", title: "Seguridad", route: "/seguridad" },
        { icon: "📤", title: "Cerrar Sesión", route: "/logout" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigate(-1)} className="text-lg">← Volver</button>
                <h1 className="text-2xl font-bold">Panel de Usuario</h1>
                <button onClick={() => navigate("/ajustes")} className="text-xl">⚙️</button>
            </div>

            {/* Contenido principal en dos columnas */}
            <div className="flex gap-6">
                {/* Columna izquierda - Perfil en tarjeta cuadrada */}
                <div className="w-90 h-100 aspect-square bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center">
                    <img
                        src="/vite.svg"
                        alt="Avatar"
                        className="w-35 h-35 rounded-full border-4 border-gray-300"
                    />
                    <h2 className="text-2xl font-bold mt-4">Dani Sanchez</h2>
                    <button
                        className="text-blue-500 text-base mt-2 hover:underline"
                        onClick={() => navigate("/editar-perfil")}
                    >
                        ✏️ Editar perfil
                    </button>
                </div>

                {/* Columna derecha - Opciones del dashboard */}
                <div className="flex-1 space-y-3">
                    {sections.map(({ icon, title, route }, i) => (
                        <motion.div
                            key={i}
                            onClick={() => navigate(route)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-between bg-white rounded-2xl p-2.5 shadow-md cursor-pointer transition"
                        >
                            <div className="text-3xl">{icon}</div>
                            <div className="flex-1 ml-4 text-base font-medium">{title}</div>
                            <div className="text-gray-400 text-xl">→</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
