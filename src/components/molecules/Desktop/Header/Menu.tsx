import ThemeToggle from "@/components/atoms/Toggle";
import { useTheme } from "@/context/ThemeProvider";
import { FC } from "react";

const Menu: FC = () => {
  const [themeMode, setToggleTheme] = useTheme();
  return (
    <div>
      <ThemeToggle toggle={setToggleTheme} mode={themeMode} />
    </div>
  );
};

export default Menu;
