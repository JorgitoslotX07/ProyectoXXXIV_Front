import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
    { icon: "🚗", title: "Mis Reservas", route: "/reservas" },
    { icon: "📍", title: "Ubicación Actual", route: "/ubicacion" },
    { icon: "💳", title: "Métodos de Pago", route: "/pagos" },
    { icon: "🕒", title: "Historial de Viajes", route: "/historial" },
    { icon: "🔒", title: "Seguridad", route: "/seguridad" },
    { icon: "📤", title: "Cerrar Sesión", route: "/logout" },
];

export const UserDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-4">

            <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigate(-1)} className="text-lg">← Volver</button>
                <h1 className="text-xl font-bold">Panel de Usuario</h1>
                <button onClick={() => navigate("/ajustes")} className="text-xl">⚙️</button>
            </div>


            <div className="flex flex-col items-center mb-8">
                <img
                    src="/avatar-placeholder.png"
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border border-gray-300"
                />
                <h2 className="text-xl font-semibold mt-2">Dani Sanchez</h2>
                <button className="text-blue-500 text-sm mt-1" onClick={() => navigate("/perfil")}>
                    ✏️ Editar perfil
                </button>
            </div>

            <div className="space-y-4">
                {sections.map(({ icon, title, route }, i) => (
                    <motion.div
                        key={i}
                        onClick={() => navigate(route)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-md cursor-pointer transition"
                    >
                        <div className="text-2xl">{icon}</div>
                        <div className="flex-1 ml-4 text-lg font-medium">{title}</div>
                        <div className="text-gray-400">→</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
