import { FC } from "react";
import styled from "styled-components";

import { Modal } from "@/components/atoms/Modal";
import LoginCloseButton from "./LoginCloseButton";
import LoginInput from "./LoginInput";

const LoginModal: FC = () => {
  return (
    <StyledLoginModal width={300} height={300}>
      <ModalContainer>
        <LoginInput />
      </ModalContainer>
      <LoginCloseButton />
    </StyledLoginModal>
  );
};

export default LoginModal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 3rem !important;
  flex-direction: column !important;
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
