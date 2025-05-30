import { useState, type FC } from "react";
import { Vehiculo } from "../../../interfaces/Vehiculo";
import type { ModalCrearVehiculoProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";

export const ModalCrearVehiculoComponent: FC<ModalCrearVehiculoProps> = ({onClose}) => {
    const [nuevoVehiculo, setNuevoVehiculo] = useState<Vehiculo>(Vehiculo);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNuevoVehiculo((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
      console.log({ ...(nuevoVehiculo as Vehiculo), id: Date.now() });
      onClose();
    };
  
    return (
      <ModalBaseComponent onClose={onClose} titulo="Agregar Vehículo">
        <form className="space-y-4">
          <input name="marca" placeholder="Marca" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <input name="modelo" placeholder="Modelo" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <input name="kilometraje" type="number" placeholder="Kilometraje" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <input name="autonomia" type="number" placeholder="Autonomía" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <select name="estado" className="w-full p-2 bg-gray-700 rounded" onChange={handleChange}>
            <option value="DISPONIBLE">Disponible</option>
            <option value="EN_USO">En uso</option>
            <option value="RESERVADO">Reservado</option>
            <option value="EN_MANTENIMIENTO">En mantenimiento</option>
          </select>
          <div className="flex justify-end pt-4">
            <button type="button" onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded hover:bg-green-500">Guardar</button>
          </div>
        </form>
      </ModalBaseComponent>
    );
  };