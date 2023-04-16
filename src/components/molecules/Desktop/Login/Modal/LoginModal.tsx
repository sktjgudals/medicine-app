import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

import { Modal } from "@/components/atoms/Modal";
import LoginCloseButton from "./LoginCloseButton";
import LoginInput from "./LoginInput";
import { modalState } from "apollo/cache";
import { useReactiveVar } from "@apollo/client";
import LoginLogo from "./LoginLogo";

const LoginModal: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  let isOpenModal = useReactiveVar(modalState);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  const handleOutsideClick = (e: Event) => {
    const current = ref.current;
    if (isOpenModal && current && !current.contains(e.target as Node))
      modalState(false);
  };

  return (
    <StyledLoginModal width={500} height={400} ref={ref}>
      <ModalContainer>
        <LoginLogo />
        <LoginInput />
        <LoginCloseButton />
      </ModalContainer>
    </StyledLoginModal>
  );
};

export default LoginModal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column !important;
`;

const StyledLoginModal = styled(Modal)`
  display: flex !important;
  position: relative !important;
  background-color: var(--color-background-base) !important;
  padding: 2.5rem !important;
  border-radius: 0.4rem !important;
  overflow: hidden !important;
  @media screen and (max-width: 500px) {
    max-width: 400px;
    min-width: 200px;
  }
`;
