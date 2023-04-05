import { FC } from "react";
import Link from "next/link";
import { Poppins } from "@next/font/google";

import Logo from "@/components/atoms/Logo";
import Search from "@/components/molecules/Desktop/Header/Search";
import Menu from "@/components/molecules/Desktop/Header/Menu";

import styles from "#/styles/organisms/Header/Desktop.module.scss";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });

const Desktop: FC = () => {
  return (
    <nav className={styles.top_nav}>
      <div className={styles.top_nav_menu}>
        <div className={styles.top_nav_menu_list_one}>
          <Link href="/" className={styles.logo_container}>
            <figure>
              <Logo width={40} height={40} />
            </figure>
            <div className={styles.text_container}>
              <h2 className={styles.main_title}>약정</h2>
            </div>
          </Link>
        </div>
        <div className={styles.top_nav_menu_list_two}>
          <Search />
        </div>
        <div className={styles.top_nav_menu_list_three}>
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Desktop;
