import dynamic from "next/dynamic";
import { FC } from "react";

import { useTheme } from "@/context/ThemeProvider";

import styles from "#/styles/molecules/Desktop/Header/Nav/Darkmode.module.scss";
import MoonIcon from "@/components/atoms/icons/MoonIcon";

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
    <div className={styles.darkmode_container} onClick={setToggleTheme}>
      <div className={styles.darkmode_label}>
        <MoonIcon width={19} height={19} />
        <p className={styles.darkmode_text}>다크모드</p>
      </div>
      <ToggleBtn
        onClick={setToggleTheme}
        toggle={themeMode}
        width={40}
        height={20}
      >
        <ToggleCircle width={19} height={19} toggle={themeMode} />
      </ToggleBtn>
    </div>
  );
};

export default Darkmode;
