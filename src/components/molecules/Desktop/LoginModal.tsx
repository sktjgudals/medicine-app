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
        <StyledXButton width={30} height={30} aria-label="팝업 닫기">
          <XIcon width={20} height={20} />
        </StyledXButton>
      </div>
    </StyledLoginModal>
  );
};

export default LoginModal;

const StyledXButton = styled(Button)`
  position: relative;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  border-radius: var(--border-radius-medium);
  width: 2rem;
  height: 2rem;
  background-color: var(--color-background-button-text-default);
  color: var(--color-fill-button-icon);
`;

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
