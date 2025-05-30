// src/components/parkings/ParkingForm.tsx
import { useState, useEffect } from "react";

interface ParkingFormProps {
  polygon: [number, number][];
  onSave: (data: { name: string; capacity: number; polygon: [number, number][] }) => void;
}

export function ParkingForm({ polygon, onSave }: ParkingFormProps) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(name.trim() !== "" && capacity > 0 && polygon.length >= 3);
  }, [name, capacity, polygon]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ name, capacity, polygon }); }}>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Capacidad:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            min={1}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Coordenadas (puntos):</label>
          <textarea
            readOnly
            value={JSON.stringify(polygon, null, 2)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 h-32"
          />
        </div>
        <button
          type="submit"
          disabled={!valid}
          className={`w-full py-2 rounded-full font-semibold ${
            valid ? "bg-green-600 hover:bg-green-500" : "bg-gray-600 cursor-not-allowed"
          } transition`}
        >
          Guardar Parking
        </button>
      </div>
    </form>
  );
}
