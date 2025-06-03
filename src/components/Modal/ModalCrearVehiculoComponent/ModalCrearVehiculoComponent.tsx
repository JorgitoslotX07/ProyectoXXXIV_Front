import { useState, type FC } from "react";
import { Vehiculo } from "../../../interfaces/Vehiculo";
import type { ModalCrearVehiculoProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import { httpPostTok } from "../../../utils/apiService";

export const ModalCrearVehiculoComponent: FC<ModalCrearVehiculoProps> = ({ onClose }) => {
  const [nuevoVehiculo, setNuevoVehiculo] = useState<Vehiculo>(Vehiculo);
  // const [image, setImage] = useState<string | null>();
  const [image, setImage] = useState<File>();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoVehiculo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file)
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payloadVehiculo = {
      marca: nuevoVehiculo.marca,
      modelo: nuevoVehiculo.modelo,
      kilometraje: Number(nuevoVehiculo.kilometraje),
      tipo: nuevoVehiculo.tipo,
      estado: nuevoVehiculo.estado,
      localidad: nuevoVehiculo.localidad,
      esAccesible: Boolean(nuevoVehiculo.esAccesible),
      puertas: nuevoVehiculo.puertas,
      autonomia: Number(nuevoVehiculo.autonomia),
      longitud: Number(nuevoVehiculo.longitud),
      latitud: Number(nuevoVehiculo.latitud),
      ultimaRevision: nuevoVehiculo.ultimaRevision,
    };


    const blobVehiculo = new Blob(
      [JSON.stringify(payloadVehiculo)],
      { type: "application/json" }
    );

    const formData = new FormData();
    formData.append("vehiculo", blobVehiculo);
    if (image) {

      formData.append("imagen", image);



      try {
        console.log("formData");

        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
        const response = await httpPostTok("/vehiculos", formData);
        console.log("Vehículo creado:", response);
        if (response) {
          onClose();
        }
      } catch (err) {
        console.error("Error al crear vehículo:", err);
      }
    }

  };

  return (
    <ModalBaseComponent onClose={onClose} titulo="Agregar Vehículo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Marca</label>
          <input
            name="marca"
            value={nuevoVehiculo.marca}
            onChange={handleChange}
            placeholder="Marca"
            className="w-full p-2 bg-gray-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Modelo</label>
          <input
            name="modelo"
            value={nuevoVehiculo.modelo}
            onChange={handleChange}
            placeholder="Modelo"
            className="w-full p-2 bg-gray-700 rounded text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Kilometraje</label>
            <input
              name="kilometraje"
              type="number"
              value={nuevoVehiculo.kilometraje}
              onChange={handleChange}
              placeholder="Kilometraje"
              className="w-full p-2 bg-gray-700 rounded text-white"
              min={0}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Autonomía (km)</label>
            <input
              name="autonomia"
              type="number"
              value={nuevoVehiculo.autonomia}
              onChange={handleChange}
              placeholder="Autonomía"
              className="w-full p-2 bg-gray-700 rounded text-white"
              min={0}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block mb-1">Cardenada Latitud</label>
            <input
              name="latitud"
              type="number"
              step="any"
              value={nuevoVehiculo.latitud}
              onChange={handleChange}
              placeholder="Latitud"
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Cardenada Longitud</label>
            <input
              name="longitud"
              type="number"
              step="any"
              value={nuevoVehiculo.longitud}
              onChange={handleChange}
              placeholder="Longitud"
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Localidad</label>
          <input
            name="localidad"
            value={nuevoVehiculo.localidad}
            onChange={handleChange}
            placeholder="Localidad"
            className="w-full p-2 bg-gray-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Estado</label>
          <select
            name="estado"
            value={nuevoVehiculo.estado}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded text-white"
            required
          >
            <option value="DISPONIBLE">Disponible</option>
            <option value="EN_MANTENIMIENTO">En Mantenimiento</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Tipo</label>
            <select
              name="tipo"
              value={nuevoVehiculo.tipo}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            >
              <option value="TURISMO">Turismo</option>
              <option value="FURGONETA">Furgoneta</option>
              <option value="SUV">SUV</option>
              <option value="CAMIONETA">Camioneta</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Puertas</label>
            <select
              name="puertas"
              value={nuevoVehiculo.puertas}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            >
              <option value="TRES">Tres</option>
              <option value="CINCO">Cinco</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="esAccesible"
            checked={nuevoVehiculo.esAccesible}
            onChange={handleChange}
            id="esAccesible"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="esAccesible" className="text-gray-200">
            ¿Accesible?
          </label>
        </div>

        <div>
          <label className="block mb-1">Última Revisión</label>
          <input
            name="ultimaRevision"
            type="date"
            value={nuevoVehiculo.ultimaRevision}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Subir Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeImg}
            className="w-full text-white"
          />
          {/* {image && (
            <img
              src={image}
              alt="Preview Vehículo"
              className="mt-2 max-h-32 rounded"
            />
          )} */}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Guardar
          </button>
        </div>
      </form>
    </ModalBaseComponent>
  );
};