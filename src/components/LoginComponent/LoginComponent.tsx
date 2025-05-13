import { useState } from "react";

interface Props {
    onClose: () => void;
}

const LoginComponent = ({ onClose }: Props) => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login:", form);
        onClose(); // cerrar el modal
    };

    return (
        // Fondo oscuro semitransparente que no interrumpe la página
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-[5px] flex items-center justify-center z-50">
            {/* Contenido del pop-up flotante */}
            <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-sm relative">
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                >
                    ✖
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-4"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-6"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
