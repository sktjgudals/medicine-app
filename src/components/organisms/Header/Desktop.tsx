import Logo from "@/components/atoms/Logo";
import ThemeToggle from "@/components/atoms/Toggle";
import Search from "@/components/molecules/Search";
import Link from "next/link";
import { FC } from "react";

import styles from "../../../../assets/styles/organisms/Header/Desktop.module.scss";

import { ICONTEXT } from "@/types/context/theme";

import { Poppins } from "@next/font/google";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

interface Props extends ICONTEXT {}

const Desktop: FC<Props> = ({ setThemeMode, themeMode }) => {
  return (
    <nav
      className={
        themeMode === "dark"
          ? `${styles.top_nav} ${styles.dark_nav}`
          : styles.top_nav
      }
    >
      <div className={styles.top_nav_menu}>
        <div className={styles.top_nav_menu_list_one}>
          <Link href="/" className={styles.logo_container}>
            <figure>
              <Logo width={40} height={40} />
            </figure>
            <div className={styles.text_container}>
              <h2
                className={
                  themeMode === "dark"
                    ? `${styles.main_title} ${styles.dark_text}`
                    : styles.main_title
                }
              >
                약정
              </h2>
            </div>
          </Link>
        </div>
        <Search />
        <ThemeToggle toggle={setThemeMode} mode={themeMode} />
      </div>
    </nav>
  );
};

export default Desktop;
