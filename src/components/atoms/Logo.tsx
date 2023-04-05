import Image from "next/image";
import { FC } from "react";
import styles from "#/styles/atoms/Logo.module.scss";

interface Props {
  width: number;
  height: number;
}

const Logo: FC<Props> = ({ width = 100, height = 100 }) => {
  return (
    <Image
      className={styles.logo}
      src="/logo.png"
      alt="logo"
      width={width}
      height={height}
      priority={true}
    />
  );
};

export default Logo;
