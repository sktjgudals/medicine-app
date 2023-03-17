import { FC } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import { useTheme } from "@/context/ThemeProvider";

import Mobile from "./Mobile";
import Desktop from "./Desktop";

const Header: FC = () => {
  const [themeMode, setToggleTheme] = useTheme();
  return (
    <header>
      <MobileView>
        <Mobile themeMode={themeMode} setThemeMode={setToggleTheme} />
      </MobileView>
      <BrowserView>
        <Desktop themeMode={themeMode} setThemeMode={setToggleTheme} />
      </BrowserView>
    </header>
  );
};

export default Header;
