import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeButtonComponent() {
  const { modoClaro, toggleModo } = useThemeContext();

  return (
    <button
      onClick={toggleModo}
      aria-label="Cambiar tema"
      className="w-12 h-6 rounded-full flex items-center px-1 bg-gray-300 transition-all duration-300 relative cursor-pointer"
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${modoClaro ? "translate-x-0 bg-white" : "translate-x-6 bg-black"
          }`}
      />
      <span className="absolute left-1 text-[10px] text-yellow-500 select-none">☀️</span>
      <span className="absolute right-1 text-[10px] text-white select-none">🌙</span>
    </button>
  );
}