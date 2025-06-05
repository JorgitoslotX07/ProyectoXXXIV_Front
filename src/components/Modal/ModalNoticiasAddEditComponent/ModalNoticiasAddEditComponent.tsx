import { useState, type FC, useEffect } from "react";
import type { ModalNoticiaProps } from "../../../interfaces/ModalProps";
import { NoticiaCrearProps, conversorNoticia } from "../../../interfaces/NoticiasProps";
import { ModalBaseComponent } from "../ModalBaseComponent/ModalBaseComponent";
import { UsuarioMe } from "../../../interfaces/Usuario";
import { httpGetTok, httpPostTok, httpPostTokImg, httpPutTok } from "../../../utils/apiService";

export const ModalNoticiasAddEditComponent: FC<ModalNoticiaProps> = ({ onClose, noticia }) => {

  const [usu, setUsuario] = useState<UsuarioMe>(UsuarioMe);
  const [form, setForm] = useState<NoticiaCrearProps>(NoticiaCrearProps);
  const [image, setImage] = useState<File>();


  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioMe>("/usuarios/me");
      if (data) {
        setUsuario(data);
        console.log(data);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (noticia) setForm(conversorNoticia(noticia, usu.username));
  }, [noticia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file)
      return;
    }
  };

  // const handleSave = async () => {
  //   const url: string = noticia
  //     ? `/noticias/${noticia.id}`
  //     : `/noticias`;
  //     form.usuario = usu.username
  //     console.log(form)

  //     const blobVehiculo = new Blob(
  //       [JSON.stringify(form)],
  //       { type: "application/form" }
  //     );


  //   const formData = new FormData();
  //   formData.append("dto", blobVehiculo);
  //   if (image) {
  //     formData.append("imagen", image);

  //     const response = !noticia ? await httpPostTok(url, form) : await httpPutTok(url, form)

  //     if (!response) {
  //       console.error("Error al guardar la noticia:", response);
  //       return;
  //     }
  //     console.log(response)

  //     onClose();
  //   } else {
  //     console.error("Error, verifique que el contenido sea validad")
  //   }
  // };

  const handleSave = async () => {
    const url = noticia ? `/noticias/${noticia.id}` : `/noticias`;
    form.usuario = usu.username;

    const formData = new FormData();
    formData.append("vehiculo", JSON.stringify(form)); // JSON string

    // formData.append("titulo", form.titulo);
    // formData.append("contenido", form.contenido);
    // formData.append("fecha", form.fecha);
    // formData.append("idiomaCodigo", form.idiomaCodigo);
    // formData.append("usuario", form.usuario);

    if (image) {
      formData.append("imagen", image);                  // archivo

    }


    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: [File]`, value.name, value.type, value.size);
      } else {
        console.log(`${key}:`, value);
      }
    }

    try {
      const response = noticia
        ? await httpPutTok(url, formData)
        : await httpPostTok(url, formData);

      if (!response) {
        console.error("Error al guardar la noticia:", response);
        return;
      }

      console.log("Noticia guardada:", response);
      onClose();
    } catch (err) {
      console.error("Error en la petición:", err);
    }
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
            value={form.fecha.slice(0, 10)}
            onChange={handleChange}
            className="p-2 bg-gray-700 rounded"
          />
          {/* <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="publicado"
              checked={form.publicado}
              onChange={handleChange}
              className="accent-green-500"
            />
            <span>Publicado</span>
          </label> */}
          <select
            name="idiomaCodigo"
            value={form.idiomaCodigo}
            onChange={handleChange}
            className="p-2 bg-gray-700 rounded"
          >
            <option value="ESP">Español</option>
            <option value="ENG">Inglés</option>
            <option value="CAT">Catalán</option>
          </select>
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