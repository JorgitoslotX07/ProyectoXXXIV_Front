import { useState } from "react";

const RegisterComponent = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        fechaNacimiento: "",
        dni: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Registrando:", form);
    };

    const hoy = new Date();
    const fechaMaxima = new Date(
        hoy.getFullYear() - 18,
        hoy.getMonth(),
        hoy.getDate()
    )
        .toISOString()
        .split("T")[0]; // formato yyyy-mm-dd

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Registrar Cuenta Usuario</h2>

            <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 mb-6 border rounded"
                required
            />

            <label className="block mb-2 font-medium">Fecha de nacimiento</label>
            <input
                type="date"
                name="fechaNacimiento"
                value={form.fechaNacimiento}
                onChange={handleChange}
                required
                max={fechaMaxima}
                className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2 font-medium">DNI</label>
            <input
                type="text"
                name="dni"
                value={form.dni}
                onChange={handleChange}
                pattern="^[0-9]{8}[A-Za-z]$"
                title="Introduce un DNI válido (8 números y una letra)"
                required
                className="w-full p-2 border rounded mb-6"
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
                Crear Cuenta
            </button>
        </form>
    );
};

export default RegisterComponent;
