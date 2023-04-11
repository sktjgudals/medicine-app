import { FC } from "react";
import styled from "styled-components";

import XIcon from "@/components/atoms/icons/XIcon";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";

import styles from "#/styles/molecules/Desktop/LoginModal.module.scss";
const LoginModal: FC = () => {
  return (
    <StyledLoginModal width={300} height={300}>
      <div className={styles.modal_container}></div>
      <div className={styles.close_button_container}>
        <StyledXButton width={30} height={30}>
          <XIcon width={20} height={20} />
        </StyledXButton>
      </div>
    </StyledLoginModal>
  );
};

export default LoginModal;

const StyledXButton = styled(Button)``;

const StyledLoginModal = styled(Modal)`
  display: flex !important;
  position: relative !important;
  background-color: var(--color-background-base) !important;
  padding: 3rem !important;
  width: 500px;
  height: 400px;
  border-radius: 0.4rem !important;
  overflow: hidden !important;
  @media screen and (max-width: 500px) {
    max-width: 400px;
    min-width: 200px;
  }
`;
