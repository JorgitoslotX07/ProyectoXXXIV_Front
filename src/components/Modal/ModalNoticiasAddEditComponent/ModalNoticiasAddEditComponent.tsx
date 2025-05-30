import { useState, type FC, useEffect } from "react";
import type { ModalNoticiaProps } from "../../../interfaces/ModalProps";
import { NoticiaProps } from "../../../interfaces/NoticiasProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";

export const  ModalNoticiasAddEditComponent: FC<ModalNoticiaProps> = ({ onClose, noticia }) =>{
    const [form, setForm] = useState<NoticiaProps>(
      noticia || NoticiaProps
    );
  
    useEffect(() => {
      if (noticia) setForm(noticia);
    }, [noticia]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type, checked } = e.target as HTMLInputElement;
      setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
  
    const handleSave = () => {

      onClose();
    };
  
    return (
      <ModalBaseComponent onClose={onClose} titulo={noticia ? 'Editar Noticia' : 'Crear Noticia'}>
        <div className="space-y-4">
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Título"
            className="w-full p-2 bg-gray-700 rounded"
          />
          <textarea
            name="contenido"
            value={form.contenido}
            onChange={handleChange}
            placeholder="Contenido"
            className="w-full p-2 bg-gray-700 rounded h-24"
          />
          <div className="flex items-center space-x-4">
            <input
              type="date"
              name="fecha"
              value={form.fecha.slice(0,10)}
              onChange={handleChange}
              className="p-2 bg-gray-700 rounded"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="publicado"
                checked={form.publicado}
                onChange={handleChange}
                className="accent-green-500"
              />
              <span>Publicado</span>
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-400">
              Cancelar
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 text-white">
              Guardar
            </button>
          </div>
        </div>
      </ModalBaseComponent>
    );
  }