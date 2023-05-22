import { FC, memo } from "react";

import Darkmode from "./Nav/Darkmode";

import styles from "#/styles/molecules/Desktop/Header/DropDown.module.scss";
import SignIn from "./Nav/SignIn";
import SignUpNav from "./Nav/SignUpNav";
import Logout from "./Nav/Logout";
import PostNav from "./Nav/PostNav";
import Profile from "./Nav/Profile";

import { SESSIONTYPE } from "@/types/session";

interface Props {
  toggleDropDown: () => void;
  isOpen: boolean;
  session: SESSIONTYPE | null;
}

const DropDown: FC<Props> = ({
  toggleDropDown,
  isOpen,
  session,
}): JSX.Element => {
  return (
    <nav className={isOpen ? styles.dropdown_menu : styles.dropdown_menu_none}>
      {!session ? (
        <>
          <Darkmode />
          <SignUpNav toggleDropDown={toggleDropDown} />
          <SignIn toggleDropDown={toggleDropDown} />
        </>
      ) : (
        <>
          <Profile session={session} />
          <Darkmode />
          <PostNav toggleDropDown={toggleDropDown} />
          <Logout />
        </>
      )}
    </nav>
  );
};

export default memo(DropDown);
