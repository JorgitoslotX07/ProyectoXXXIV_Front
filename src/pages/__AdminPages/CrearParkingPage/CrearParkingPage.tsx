import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { MapEditorComponent } from "../../../components/Maps/MapEditorComponent/MapEditorComponent";
import { ParkingForm } from "../../../components/Form/ParkingFormComponent/ParkingFormComponent";
import type { LatLngTuple } from "leaflet";
import { httpPostTok } from "../../../utils/apiService";
import { useNavigate } from "react-router-dom";

export const CrearParkingPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [polygon, setPolygon] = useState<LatLngTuple[]>([]);

  const handleSave = async (data: { name: string; capacity: number }) => {
    if (polygon.length === 0) {
      alert(t("createParking.alert.noPolygon"));
      return;
    }

    const newParking = {
      name: data.name,
      capacity: data.capacity,
      polygon: polygon,
    };

    try {
      console.log(newParking);
      await httpPostTok("/parkings", newParking);
      console.log("Hecho");

      navigate("/admin/parkings");
    } catch (error) {
      console.error("Error al crear el parking:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{t("createParking.title")}</h1>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white">
        <div className="flex flex-col lg:flex-row p-6 text-white gap-6">
          <section className="flex-1">
            <MapEditorComponent onPolygonChange={setPolygon} initialPolygon={[]} />
          </section>
          <aside className="lg:w-1/3">
            <ParkingForm polygon={polygon} onSave={handleSave} />
          </aside>
        </div>
      </div>
    </>
  );
};
