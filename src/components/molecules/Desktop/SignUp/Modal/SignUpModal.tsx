import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

import { Modal } from "@/components/atoms/Modal";
import { useReactiveVar } from "@apollo/client";
import { signUpModalState } from "apollo/cache";
import ModalLogo from "../../Modal/ModalLogo";
import ModalCloseButton from "../../Modal/ModalCloseButton";

const SignUpModal: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  let isOpenModal = useReactiveVar(signUpModalState);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  const handleOutsideClick = (e: Event) => {
    const current = ref.current;
    if (isOpenModal && current && !current.contains(e.target as Node))
      signUpModalState(false);
  };

  return (
    <StyledModal width={500} ref={ref}>
      <ModalContainer>
        <ModalLogo width={50} height={50} />
        <ModalCloseButton cb={signUpModalState} />
      </ModalContainer>
    </StyledModal>
  );
};

export default SignUpModal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column !important;
`;

const StyledModal = styled(Modal)`
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
