import { FC, memo } from "react";
import Link from "next/link";

import Darkmode from "./Nav/Darkmode";

import styles from "#/styles/molecules/Desktop/Header/DropDown.module.scss";
import SignIn from "./Nav/SignIn";
import SignUpNav from "./Nav/SignUpNav";
import { useSession } from "@/hooks/useSession";
import Logout from "./Nav/Logout";
import PostNav from "./Nav/PostNav";

interface Props {
  toggleDropDown: () => void;
  isOpen: boolean;
}

const DropDown: FC<Props> = ({ toggleDropDown, isOpen }): JSX.Element => {
  const { loading, session } = useSession();
  if (loading) return <></>;

  return (
    <nav className={isOpen ? styles.dropdown_menu : styles.dropdown_menu_none}>
      <Link href="/" onClick={(): void => toggleDropDown()}></Link>
      <Darkmode />

      {!session ? (
        <>
          <SignUpNav toggleDropDown={toggleDropDown} />
          <SignIn toggleDropDown={toggleDropDown} />
        </>
      ) : (
        <>
          <PostNav />
          <Logout />
        </>
      )}
    </nav>
  );
};

export default memo(DropDown);
