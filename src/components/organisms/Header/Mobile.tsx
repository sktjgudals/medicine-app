import { FC } from "react";
import Link from "next/link";

import Logo from "@/components/atoms/Logo";
import ThemeToggle from "@/components/atoms/Toggle";
import Search from "@/components/molecules/Search";

import styles from "../../../../assets/styles/organisms/Header/Mobile.module.scss";

import { ICONTEXT } from "@/types/context/theme";

interface Props extends ICONTEXT {}

const Mobile: FC<Props> = ({ setThemeMode, themeMode }) => {
  return (
    <div>
      <div className={styles.desktop_header_container}>
        <Link href="/" className={styles.desktop_logo_container}>
          <Logo width={100} height={100} />
          <p className={styles.desktop_main_title}>약정</p>
        </Link>
        <Search />
        <ThemeToggle toggle={setThemeMode} mode={themeMode} />
      </div>
    </div>
  );
};

export default Mobile;
