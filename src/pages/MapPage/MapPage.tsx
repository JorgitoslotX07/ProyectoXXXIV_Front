


const MapPage = () => {
    return (
        <main className="px-4 py-10">
            <h2 className="text-2xl font-bold text-center mb-4">Encuentra tu coche más cercano</h2>
            <p className="text-center text-gray-600 mb-6">
                Consulta dónde están disponibles nuestros coches eléctricos.
            </p>
            <CochesMapComponent />
        </main>
    );
};

export default MapPage;
