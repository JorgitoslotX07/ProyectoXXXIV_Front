import { createContext, useContext } from "react";
import { useThemeMode } from "../hooks/themeMode";

const ThemeContext = createContext<ReturnType<typeof useThemeMode> | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = useThemeMode();
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
    return context;
};