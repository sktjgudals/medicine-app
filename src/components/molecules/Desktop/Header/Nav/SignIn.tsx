import { FC } from "react";

import SignInIcon from "@/components/atoms/icons/SignInIcon";

import styles from "#/styles/molecules/Desktop/Header/Nav/SignIn.module.scss";

import useModal from "@/hooks/useModal";
import Portal from "@/components/atoms/Portal";
import Login from "@/components/organisms/Login";

interface Props {
  toggleDropDown: () => void;
}

const SignIn: FC<Props> = ({ toggleDropDown }) => {
  const { clickModal, isOpenModal } = useModal();
  const handleClick = async () => {
    clickModal();
  };

  return (
    <div className={styles.signin_container}>
      <div
        className={styles.signin_label}
        onClick={() => handleClick().then(toggleDropDown)}
      >
        <SignInIcon width={19} height={19} />
        <p className={styles.signin_text}>로그인</p>
      </div>
      {isOpenModal && (
        <Portal
          selector={"modal"}
          children={<Login clickModal={clickModal} />}
        />
      )}
    </div>
  );
};

export default SignIn;
