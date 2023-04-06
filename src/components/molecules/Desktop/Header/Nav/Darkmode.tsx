import { FC } from "react";
import styled from "styled-components";

import { useTheme } from "@/context/ThemeProvider";
import { ToggleProps, Toggle, Circle } from "@/components/atoms/Toggle";

import styles from "#/styles/molecules/Desktop/Header/Nav/Darkmode.module.scss";
import MoonIcon from "@/components/atoms/icons/MoonIcon";

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
        <ToggleCircle toggle={themeMode} width={19} height={19} />
      </ToggleBtn>
    </div>
  );
};

export default Darkmode;

interface StyledProps extends ToggleProps {
  toggle: "dark" | "light";
}

const ToggleBtn = styled(Toggle)<StyledProps>`
  background-color: ${(props) =>
    props.toggle === "light" ? "none" : "var(--color-green-9)"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const ToggleCircle = styled(Circle)<StyledProps>`
  position: absolute;
  left: 2%;
  background-color: white;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle === "dark" &&
    `
      transform: translate(12px, 0);
    `}
`;
