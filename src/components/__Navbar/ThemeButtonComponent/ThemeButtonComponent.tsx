import { useThemeContext } from "../../../context/ThemeContext";

const ThemeButtonComponent = () => {
  const { modoClaro, toggleModo } = useThemeContext();

  return (
    <button
      onClick={toggleModo}
      className={`w-12 h-6 rounded-full flex items-center px-1 transition-all duration-300 relative cursor-pointer ${
        modoClaro ? "bg-gray-300" : "bg-gray-700"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          modoClaro ? "translate-x-0 bg-white" : "translate-x-6 bg-black"
        }`}
      />
      {modoClaro ? (
        <span className="absolute left-1 text-[10px] text-yellow-500 select-none">☀️</span>
      ) : (
        <span className="absolute right-1 text-[10px] text-white select-none">🌙</span>
      )}
    </button>
  );
};

export default ThemeButtonComponent;
