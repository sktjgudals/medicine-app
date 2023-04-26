import { FC } from "react";

import styled from "styled-components";

import { ModalWrapper } from "../../atoms/Modal";
import SignUpModal from "@/components/molecules/Desktop/SignUp//SelectModal/SignUpModal";

const Desktop: FC = () => {
  return (
    <StyledModalWrapper>
      <SignUpModal />
    </StyledModalWrapper>
  );
};

export default Desktop;

const StyledModalWrapper = styled(ModalWrapper)`
  display: flex;
  position: fixed;
  z-index: var(--z-index-modal);
  justify-content: center;
  align-items: center;
  overflow: auto;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`;
