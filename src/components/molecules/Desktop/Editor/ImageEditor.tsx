import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import Image from "next/image";

import useImageModal from "@/hooks/useImageModal";

import ImageModal from "./ImageModal";
import Portal from "@/components/atoms/Portal";
import ImageIcon from "@/components/atoms/icons/imageIcon";
import { ReactiveVar } from "@apollo/client";

interface Props {
  text: string;
  image: string;
  cb: (e: string, setLoading: Dispatch<SetStateAction<boolean>>) => void;
  reactiveVar: ReactiveVar<string>;
}

const ImageEditor: FC<Props> = ({ text, image, cb, reactiveVar }) => {
  const { clickModal, isOpenModal } = useImageModal();

  return (
    <MainContainer>
      <ImageContainer>
        <ImageContent onClick={() => clickModal()}>
          {image.length > 0 ? (
            <Image src={image} width={200} height={200} alt="image" />
          ) : (
            <IconContainer>
              <ImageIcon color={"#cccccc"} />
            </IconContainer>
          )}
          <ImageButton>{text}</ImageButton>
        </ImageContent>
        {isOpenModal && (
          <Portal
            selector={"modal"}
            children={
              <ImageModal image={image} cb={cb} reactiveVar={reactiveVar} />
            }
          />
        )}
      </ImageContainer>
    </MainContainer>
  );
};

export default ImageEditor;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ImageContent = styled.div`
  position: relative;
  overflow: hidden;
`;

const ImageButton = styled.div`
  position: absolute;
  width: auto;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: var(--color-green-10);
  opacity: 0.9;
  &:hover {
    background: var(--color-green-11);
  }
`;

const IconContainer = styled.div`
  width: 200px;
`;
