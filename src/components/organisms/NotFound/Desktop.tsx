import { FC } from "react";

import Logo from "@/components/atoms/Logo";
import styles from "../../../../assets/styles/organisms/NotFound/Desktop.module.scss";

const Desktop: FC = () => {
  return (
    <div className={styles.main_container}>
      <Logo width={300} height={300} />
    </div>
  );
};

export default Desktop;
