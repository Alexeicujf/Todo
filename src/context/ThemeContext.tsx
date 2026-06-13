/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode} from "react";

type Theme = "light" | "dark";
interface IThemeContext {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);
export const ThemeProvider = ({children} : {children : ReactNode}) => {
    const [theme, setTheme] = useState<Theme>("light");
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme])
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light"? "dark" : "light"));
    }
    return(
        <ThemeContext.Provider
        value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context
}