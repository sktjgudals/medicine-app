import { FC, memo } from "react";
import Link from "next/link";

import Darkmode from "./Nav/Darkmode";

import styles from "#/styles/molecules/Desktop/Header/DropDown.module.scss";
import SignIn from "./Nav/SignIn";

interface Props {
  toggleDropDown: () => void;
}

const DropDown: FC<Props> = ({ toggleDropDown }): JSX.Element => {
  return (
    <nav className={styles.dropdown_menu}>
      <Link href="/" onClick={(): void => toggleDropDown()}></Link>
      <Darkmode />
      <SignIn toggleDropDown={toggleDropDown} />
    </nav>
  );
};

export default memo(DropDown);
