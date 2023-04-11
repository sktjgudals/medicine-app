import { FC } from "react";

import SignInIcon from "@/components/atoms/icons/SignInIcon";

import styles from "#/styles/molecules/Desktop/Header/Nav/SignIn.module.scss";

import useModal from "@/hooks/useModal";

interface Props {
  toggleDropDown: () => void;
}

const SignIn: FC<Props> = ({ toggleDropDown }) => {
  const { clickModal, isOpenModal } = useModal();
  console.info(isOpenModal);
  const handleClick = async () => {
    clickModal();
  };

  return (
    <div
      className={styles.signin_container}
      onClick={() => handleClick().then(toggleDropDown)}
    >
      <div className={styles.signin_label}>
        <SignInIcon width={19} height={19} />
        <p className={styles.signin_text}>로그인</p>
      </div>
      {/* {isOpenModal && } */}
    </div>
  );
};

export default SignIn;
