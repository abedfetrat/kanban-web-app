import { ReactNode, createContext, useContext, useEffect } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

const THEMES = {
  light: "light",
  dark: "dark",
};

const ThemeContext = createContext({
  theme: THEMES.light,
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorageState(
    "theme",
    (function (): string {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return THEMES.dark;
      }
      return THEMES.light;
    })(),
  );

  useEffect(() => {
    if (theme === THEMES.dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider as default, useTheme, THEMES };
