import { createContext, useContext, useState } from "react";

interface ThemeContextProps {
  modoClaro: boolean;
  toggleModo: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  modoClaro: false,
  toggleModo: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [modoClaro, setModoClaro] = useState<boolean>(
    localStorage.getItem("theme") === "light"
  );

  const toggleModo = () => {
    setModoClaro((prev) => {
      const nuevo = !prev;
      localStorage.setItem("theme", nuevo ? "light" : "dark");
      return nuevo;
    });
  };

  return (
    <ThemeContext.Provider value={{ modoClaro, toggleModo }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);