import { useState, type FC } from "react";
import { MapEditorComponent } from "../../../components/Maps/MapEditorComponent/MapEditorComponent";
import { ParkingForm } from "../../../components/Form/ParkingFormComponent/ParkingFormComponent";


export const CrearParkingPage: FC = () => {
  const [polygon, setPolygon] = useState<[number, number][]>([]);
  const [parkings, setParkings] = useState<any[]>([]); // tu estado o fetch

  const handleSave = (data: any) => {
    setParkings((prev) => [...prev, { ...data, id: Date.now() }]);
    setPolygon([]);
    // aquí enviarías a tu API
  };

  return (
    <>    <h1 className="text-2xl font-bold mb-4">Nuevo Parking</h1>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white">

        <div className="flex flex-col lg:flex-row p-6 text-white gap-6">
          <section className="flex-1">
            <MapEditorComponent onPolygonChange={setPolygon} />
          </section>
          <aside className="lg:w-1/3">
            <ParkingForm polygon={polygon} onSave={handleSave} />
          </aside>
        </div>
      </div>
    </>

  );
}
