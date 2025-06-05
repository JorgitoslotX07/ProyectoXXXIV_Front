import type { FC } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { NoticiaProps } from "../../interfaces/NoticiasProps";
import type { ModoClaroProps } from "../../interfaces/ModoClaroProps";
import { NoticiasComponent } from "../../components/NoticiasComponent/NoticiasComponent";

export const NoticiaDetailPage: FC<ModoClaroProps> = ({ modoClaro }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const noticia: NoticiaProps = location.state;

  return (
    <main
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 transition-colors duration-300 ${
        modoClaro ? "bg-white text-gray-900" : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <section>
          <h1 className="text-4xl font-extrabold leading-snug mb-4">
            {noticia.titulo}
          </h1>

          <p
            className={`text-sm mb-6 ${
              modoClaro ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {noticia.fecha} · {t("noticia.autor")}{" "}
            <span className="italic">{noticia.autor}</span>
          </p>

          <div className="mb-8">
            <img
              src={noticia.imagen}
              alt={noticia.titulo}
              className="w-[47em] h-auto object-cover rounded"
            />
          </div>

          <p
            className={`text-lg mb-8 ${
              modoClaro ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {noticia.descripcion}
          </p>

          <article
            className={`text-[17px] leading-[1.75rem] space-y-6 ${
              modoClaro ? "text-gray-800" : "text-gray-200"
            }`}
          >
            {noticia.contenido ? (
              noticia.contenido
                .split("\n\n")
                .map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <p className="italic text-gray-500">
                {t("noticia.sinContenido")}
              </p>
            )}
          </article>
        </section>

        <aside className="hidden lg:block h-screen overflow-auto pr-2 py-16">
          <h2
            className={`text-lg font-semibold mb-5 pl-4 ${
              modoClaro ? "text-gray-900" : "text-gray-100"
            }`}
          >
            {t("noticia.otrasNoticias")}
          </h2>
          <NoticiasComponent size={20} modoClaro={modoClaro} />
        </aside>
      </div>
    </main>
  );
};
