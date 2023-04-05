import { MODE, ICONTEXT } from "@/types/context/theme";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { ThemeProvider as StyledProvider } from "styled-components";

const lightTheme = {
  bgColor: "#f7f7f8",
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

const setHtmlTheme = (value: any) => {
  document.documentElement.setAttribute("color-theme", value);
};

const ThemeProvider = ({ children }: { children: JSX.Element[] }) => {
  let localTheme =
    typeof window !== "undefined"
      ? (window.localStorage.getItem("theme") as MODE)
      : "light";
  if (localTheme === null) localTheme = "light";
  useEffect(() => {
    setHtmlTheme(localTheme);
  }, [localTheme]);
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
    setHtmlTheme(themeMode);
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
