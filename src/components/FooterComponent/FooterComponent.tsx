import { useState, type FC } from "react";

export const FooterComponent: FC = () => {
    const listaUl = [
        ["Atención al cliente", "Devoluciones y garantía", "Pagos", "Condiciones de servicio", "Política de privacidad"],
        ["Información corporativa", "Sobre nosotros", "Marcas", "Afiliados", "Inversores", "Cookies"],
        ["Recursos", "Blog", "FAQs", "Soporte Técnico", "Foro"],
    ];

    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Gracias por contactar con nosotros: ${email}`);
        setEmail("");
    };

    return (
        <>
            <div className="flex justify-between px-20 py-12 bg-[#090c10] shadow-lg text-gray-300 flex-wrap gap-10">
                {listaUl.map((seccion, index) => (
                    <div key={index} className="min-w-[160px]">
                        <ul className="flex flex-col space-y-2">
                            <li className="text-white font-semibold text-lg mb-4 cursor-default">
                                {seccion[0]}
                            </li>
                            {seccion.slice(1).map((item, idx) => (
                                <li
                                    key={idx}
                                    className="hover:text-white cursor-pointer transition-colors duration-200"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="min-w-[280px]">
                    <h3 className="text-white font-semibold text-lg mb-4 cursor-default">
                        Contacto directo
                    </h3>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-4 py-2 rounded bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded transition"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
