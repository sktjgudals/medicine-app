import { FC, memo } from "react";
import Link from "next/link";

import Darkmode from "./Nav/Darkmode";

import styles from "#/styles/molecules/Desktop/Header/DropDown.module.scss";
import SignIn from "./Nav/SignIn";

interface Props {
  toggleDropDown: () => void;
  isOpen: boolean;
}

const DropDown: FC<Props> = ({ toggleDropDown, isOpen }): JSX.Element => {
  return (
    <nav className={isOpen ? styles.dropdown_menu : styles.dropdown_menu_none}>
      <Link href="/" onClick={(): void => toggleDropDown()}></Link>
      <Darkmode />
      <SignIn toggleDropDown={toggleDropDown} />
    </nav>
  );
};

export default memo(DropDown);
