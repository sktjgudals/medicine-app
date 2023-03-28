import React from "react";
import Logo from "@/components/atoms/Logo";
import styles from "../../../../assets/styles/organisms/NotFound/Index.module.scss";

const Index = () => {
  return (
    <div className={styles.main_container}>
      <Logo width={300} height={300} />
    </div>
  );
};

export default Index;
