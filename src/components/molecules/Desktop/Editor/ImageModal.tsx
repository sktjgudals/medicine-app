import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

import ImageUpload from "./ImageUpload";
import { ModalWrapper } from "@/components/atoms/Modal";

interface Props {
  image: any;
  setImage: Dispatch<SetStateAction<string>>;
}

const ImageModal: FC<Props> = ({ image, setImage }) => {
  return (
    <StyledLoginModalWrapper>
      <ImageUpload image={image} setImage={setImage} />
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
