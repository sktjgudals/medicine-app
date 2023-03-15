import { MODE, ICONTEXT } from "@/types/context/theme";
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

const INITIAL = {
  themeMode: "light",
};

const ThemeContext = createContext(INITIAL as ICONTEXT);

const ThemeProvider = ({ children }: { children: JSX.Element[] }) => {
  const localTheme =
    typeof window !== "undefined"
      ? (window.localStorage.getItem("theme") as MODE)
      : "light";
  const [themeMode, setThemeMode] = useState<MODE>(localTheme);

  const themeObject = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context as any;

  const setToggleTheme = useCallback(() => {
    if (themeMode === "light") {
      window.localStorage.setItem("theme", "dark");
      setThemeMode("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setThemeMode("light");
    }
  }, [themeMode]);

  return [themeMode, setToggleTheme];
};

export { ThemeProvider, useTheme };
