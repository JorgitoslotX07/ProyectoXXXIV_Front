import React from "react";

const CookiesPage: React.FC = () => {
    return (
        <main className="p-6 max-w-3xl mx-auto text-justify text-sm leading-relaxed">
            <h1 className="text-3xl font-bold mb-4 text-center">Política de Cookies</h1>

            <p>
                Esta página web utiliza cookies propias y de terceros para mejorar tu experiencia de navegación, recopilar información estadística sobre el uso del sitio y personalizar contenidos.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">¿Qué son las cookies?</h2>
            <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo al visitar un sitio web. Su función principal es reconocer al usuario y mejorar la usabilidad del sitio.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Tipos de cookies utilizadas</h2>
            <ul className="list-disc pl-6">
                <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio web.</li>
                <li><strong>Cookies de análisis:</strong> Nos permiten conocer cómo interactúan los usuarios con la web.</li>
                <li><strong>Cookies de personalización:</strong> Adaptan el contenido a tus preferencias.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">¿Cómo puedo desactivarlas?</h2>
            <p>
                Puedes configurar tu navegador para aceptar o rechazar todas las cookies por defecto o para recibir un aviso en pantalla cada vez que se reciba una cookie.
                Consulta la ayuda de tu navegador para saber cómo hacerlo.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Consentimiento</h2>
            <p>
                Al continuar navegando por esta web, aceptas el uso de cookies conforme a esta política. Si no estás de acuerdo, puedes desactivarlas siguiendo las instrucciones anteriores.
            </p>

            <p className="mt-6 text-center text-gray-500 text-xs">
                Última actualización: mayo 2025
            </p>
        </main>
    );
};

export default CookiesPage;
