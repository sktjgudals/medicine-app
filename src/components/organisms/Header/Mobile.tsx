import { FC } from "react";
import Link from "next/link";

import Logo from "@/components/atoms/Logo";
import Search from "@/components/molecules/Desktop/Header/Search";

import styles from "#/styles/organisms/Header/Mobile.module.scss";

const Mobile: FC = () => {
  return (
    <div className={styles.top_nav}>
      <Link href="/" className={styles.logo_container}>
        <Logo width={100} height={100} />
        <p className={styles.main_title}>약정</p>
      </Link>
      <Search />
    </div>
  );
};

export default Mobile;
