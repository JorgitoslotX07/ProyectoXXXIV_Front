import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../context/ThemeContext";

const SobreNosotros = () => {
  const { t } = useTranslation();
  const { modoClaro } = useThemeContext();

  return (
    <main className={`p-6 max-w-3xl mx-auto my-10 rounded-xl shadow-md transition-all duration-300 ${modoClaro ? "bg-white text-[#333]" : "bg-[#1f2937] text-white"}`}>
      <h1 className="text-3xl font-bold mb-4 text-center">{t("footer.sobrenosotros.titulo")}</h1>
      <p>{t("footer.sobrenosotros.contenido")}</p>
    </main>
  );
}

export default SobreNosotros;
