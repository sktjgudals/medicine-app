export type MODE = "dark" | "light";

export interface ICONTEXT {
  themeMode: MODE;
  setThemeMode: (type: MODE) => void;
}
