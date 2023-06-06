import { FC, memo } from "react";

import Darkmode from "./Nav/Darkmode";

import styles from "#/styles/molecules/Desktop/Header/DropDown.module.scss";
import SignIn from "./Nav/SignIn";
import SignUpNav from "./Nav/SignUpNav";
import Logout from "./Nav/Logout";
import PostNav from "./Nav/PostNav";
import Profile from "./Nav/Profile";

import { SESSIONTYPE } from "@/types/session";
import Term from "./Nav/Term";
import styled from "styled-components";

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
          <Term toggleDropDown={toggleDropDown} />
          <SignUpNav toggleDropDown={toggleDropDown} />
          <SignIn toggleDropDown={toggleDropDown} />
        </>
      ) : (
        <>
          <Profile session={session} toggleDropDown={toggleDropDown} />
          <Darkmode />
          <PostNav toggleDropDown={toggleDropDown} />
          <Term toggleDropDown={toggleDropDown} />
          <Logout />
        </>
      )}
    </nav>
  );
};

export default memo(DropDown);

const TermWrapper = styled.div`
  // padding-right: 30px;
  width: 100%;
`;
