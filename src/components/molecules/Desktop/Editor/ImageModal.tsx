import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

import ImageUpload from "./ImageUpload";
import { ModalWrapper } from "@/components/atoms/Modal";
import { ReactiveVar } from "@apollo/client";

interface Props {
  image: string;
  cb: (e: string, setLoading: Dispatch<SetStateAction<boolean>>) => void;
  reactiveVar: ReactiveVar<string>;
}

const ImageModal: FC<Props> = ({ image, cb, reactiveVar }) => {
  return (
    <StyledLoginModalWrapper>
      <ImageUpload image={image} cb={cb} reactiveVar={reactiveVar} />
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
