import { useEffect, type FC, useState } from "react";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import type { ModalParkingProps } from "../../../interfaces/ModalProps";
import { MapEditorComponent } from "../../Maps/MapEditorComponent/MapEditorComponent";
import type { LatLngTuple } from "leaflet";
import { httpPutTok } from "../../../utils/apiService";

export const ModalEditarParkingComponent: FC<ModalParkingProps> = ({ parking, onClose }) => {
    const [name, setName] = useState(parking.name);
    const [capacity, setCapacity] = useState(parking.capacity);
    const [polygon, setPolygon] = useState<LatLngTuple[]>(parking.polygon);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(parking.name);
        setCapacity(parking.capacity);
        setPolygon(parking.polygon);
    }, [parking]);

    const handleSave = async () => {
        setLoading(true);
        const updatedParking = {
            id: parking.id,
            name,
            capacity,
            polygon,
        };

        console.log(updatedParking)
        const result = await httpPutTok(`/parkings/${parking.id}`, updatedParking);
        setLoading(false);

        if (result !== null) {
            onClose();
        } else {
            console.log("Error al guardar los cambios");
        }
    };


    return (
        <ModalBaseComponent onClose={onClose} titulo="Editar Parking">
            <div className="space-y-4">
                <div>
                    <label className="block mb-1">Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Capacidad:</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                    />
                </div>
                <div>
                    <label className="block mb-1">Editar Zona:</label>
                    <MapEditorComponent initialPolygon={polygon} onPolygonChange={setPolygon} />
                </div>
                <button
                    onClick={handleSave}
                    className={`w-full py-2 rounded-full ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-500'} text-white font-semibold transition`}
                    disabled={loading}
                >
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
            </div>
        </ModalBaseComponent>
    );
}