import { FC } from "react";

import Logo from "@/components/atoms/Logo";
import styles from "#/styles/organisms/NotFound/Desktop.module.scss";
import Link from "next/link";

const Desktop: FC = () => {
  return (
    <div className={styles.main_container}>
      <Link href={"/"}>
        <Logo width={300} height={300} />
      </Link>
      <div className={styles.main_text_container}>
        <p className={styles.main_text}>찾을 수 없는 페이지입니다.</p>
        <p className={styles.main_text}>
          입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </p>
        <Link className={styles.main_link} href={"/"}>
          돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Desktop;
