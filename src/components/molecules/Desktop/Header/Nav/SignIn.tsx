import { FC } from "react";

import SignInIcon from "@/components/atoms/icons/SignInIcon";

import styles from "#/styles/molecules/Desktop/Header/Nav/SignIn.module.scss";
import Link from "next/link";

interface Props {
  toggleDropDown: () => void;
}

const SignIn: FC<Props> = ({ toggleDropDown }) => {
  return (
    <Link href="/login" onClick={toggleDropDown}>
      <div className={styles.signin_container}>
        <div className={styles.signin_label}>
          <SignInIcon width={19} height={19} />
          <p className={styles.signin_text}>로그인</p>
        </div>
      </div>
    </Link>
  );
};

export default SignIn;
