import dynamic from "next/dynamic";
import { FC } from "react";

import MoonIcon from "@/components/atoms/icons/MoonIcon";
import { useTheme } from "@/context/ThemeProvider";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";

const ToggleBtn = dynamic(
  () => import("./DarkModeToggle").then((mod) => mod.ToggleBtn),
  { ssr: false }
);

const ToggleCircle = dynamic(
  () => import("./DarkModeToggle").then((mod) => mod.ToggleCircle),
  { ssr: false }
);

const Darkmode: FC = () => {
  const [themeMode, setToggleTheme] = useTheme();
  return (
    <NavContainer onClick={setToggleTheme} style={{ marginBottom: "8px" }}>
      <NavButton>
        <MoonIcon width={19} height={19} />
        <NavText>다크모드</NavText>
      </NavButton>
      <ToggleBtn
        onClick={setToggleTheme}
        toggle={themeMode}
        width={40}
        height={20}
      >
        <ToggleCircle width={19} height={19} toggle={themeMode} />
      </ToggleBtn>
    </NavContainer>
  );
};

export default Darkmode;
