import { createContext, useState, useContext, useCallback } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

const lightTheme = {
  bgColor: "#F8F7F4",
  textColor: "#31302E",
};

const darkTheme = {
  bgColor: "#1E1E22",
  textColor: "#ccc",
};

type MODE = "dark" | "light";

interface ICONTEXT {
  themeMode: MODE;
  setThemeMode: (type: MODE) => void;
}

const INITIAL = {
  themeMode: "light",
};

const ThemeContext = createContext(INITIAL as ICONTEXT);

const ThemeProvider = ({ children }: { children: JSX.Element[] }) => {
  const localTheme = window.localStorage.getItem("theme") as MODE;
  const [themeMode, setThemeMode] = useState<MODE>(
    localTheme ? localTheme : "light"
  );
  const themeObject = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = useCallback(() => {
    if (themeMode === "light") {
      setThemeMode("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setThemeMode("light");
      window.localStorage.setItem("theme", "light");
    }
  }, [themeMode]);

  return [themeMode, toggleTheme];
};

export { ThemeProvider, useTheme };
