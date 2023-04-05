import { FC, memo } from "react";
import Link from "next/link";
import styled from "styled-components";

import { useTheme } from "@/context/ThemeProvider";
import { ToggleProps, Toggle, Circle } from "@/components/atoms/Toggle";

import styles from "../../../../../assets/styles/molecules/Desktop/Header/DropDown.module.scss";

interface Props {
  toggleDropDown: () => void;
}

const DropDown: FC<Props> = ({ toggleDropDown }): JSX.Element => {
  const [themeMode, setToggleTheme] = useTheme();

  return (
    <nav className={styles.dropdown_menu}>
      <Link href="/" onClick={(): void => toggleDropDown()}></Link>
      <div className={styles.darkmode_container} onClick={setToggleTheme}>
        <p className={styles.darkmode_text}>다크모드</p>
        <ToggleBtn
          onClick={setToggleTheme}
          toggle={themeMode}
          width={35}
          height={20}
        >
          <ToggleCircle toggle={themeMode} width={19} height={19} />
        </ToggleBtn>
      </div>
    </nav>
  );
};

export default memo(DropDown);

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
  left: 5%;
  background-color: white;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle === "dark" &&
    `
      transform: translate(14px, 0);
    `}
`;
