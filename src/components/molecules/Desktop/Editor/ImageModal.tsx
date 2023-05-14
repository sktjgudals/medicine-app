import { FC } from "react";
import styled from "styled-components";

import ImageUpload from "./ImageUpload";
import { ModalWrapper } from "@/components/atoms/Modal";

const ImageModal: FC = () => {
  return (
    <StyledLoginModalWrapper>
      <ImageUpload />
    </StyledLoginModalWrapper>
  );
};

export default ImageModal;

const StyledLoginModalWrapper = styled(ModalWrapper)`
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
