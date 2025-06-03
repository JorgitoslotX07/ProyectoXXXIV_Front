import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextProps {
    modoClaro: boolean;
    toggleModo: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    modoClaro: false,
    toggleModo: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [modoClaro, setModoClaro] = useState(() =>
        localStorage.getItem("theme") === "light"
    );

    useEffect(() => {
        localStorage.setItem("theme", modoClaro ? "light" : "dark");
    }, [modoClaro]);

    const toggleModo = () => setModoClaro((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ modoClaro, toggleModo }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
