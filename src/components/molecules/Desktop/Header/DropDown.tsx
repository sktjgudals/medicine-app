import { FC, memo } from "react";
import Link from "next/link";

import Darkmode from "./Nav/Darkmode";

import styles from "#/styles/molecules/Desktop/Header/DropDown.module.scss";

interface Props {
  toggleDropDown: () => void;
}

const DropDown: FC<Props> = ({ toggleDropDown }): JSX.Element => {
  return (
    <nav className={styles.dropdown_menu}>
      <Link href="/" onClick={(): void => toggleDropDown()}></Link>
      <Darkmode />
    </nav>
  );
};

export default memo(DropDown);
