
import { useState, type FC } from "react";
import type { Vehiculo } from "../../../interfaces/Vehiculo";
import type { ModalEditarVehiculoProps } from "../../../interfaces/ModalProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";

export const ModalEditarVehiculo: FC<ModalEditarVehiculoProps> = ({ vehiculo, onClose}) => {
    const [editado, setEditado] = useState<Vehiculo>(vehiculo);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setEditado((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
      console.log(editado);
      onClose();
    };
  
    return (
      <ModalBaseComponent onClose={onClose} titulo="Editar Vehículo">
        <form className="space-y-4">
          <input name="marca" value={editado.marca} className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <input name="modelo" value={editado.modelo} className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <input name="kilometraje" type="number" value={editado.kilometraje} className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <input name="autonomia" type="number" value={editado.autonomia} className="w-full p-2 bg-gray-700 rounded" onChange={handleChange} />
          <select name="estado" value={editado.estado} className="w-full p-2 bg-gray-700 rounded" onChange={handleChange}>
            <option value="DISPONIBLE">Disponible</option>
            <option value="EN_USO">En uso</option>
            <option value="RESERVADO">Reservado</option>
            <option value="EN_MANTENIMIENTO">En mantenimiento</option>
          </select>
          <div className="flex justify-end pt-4">
            <button type="button" onClick={handleSubmit} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">Actualizar</button>
          </div>
        </form>
      </ModalBaseComponent>
    );
  };