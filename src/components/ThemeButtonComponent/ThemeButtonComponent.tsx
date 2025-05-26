// import { Moon, Sun } from "lucide-react"; // opcional, íconos
import { themeMode } from "../../hooks/themeMode";

export default function ThemeButtonComponent() {
  const { darkMode, toggleDarkMode } = themeMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-12 h-6 rounded-full flex items-center px-1 bg-gray-300 dark:bg-gray-700 transition duration-300 relative cursor-pointer"
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <span className="absolute left-1 text-[10px] text-yellow-500 dark:hidden">
        ☀️
      </span>
      <span className="absolute right-1 text-[10px] text-white hidden dark:block">
        🌙
      </span>
    </button>
  );
}
