import { FC, useState } from "react";
import styled from "styled-components";
import useImageModal from "@/hooks/useImageModal";

import ImageModal from "./ImageModal";
import Portal from "@/components/atoms/Portal";
import Image from "next/image";
import ImageIcon from "@/components/atoms/icons/imageIcon";

const ImageEditor: FC = () => {
  const [image, setImage] = useState<string>("");
  const { clickModal, isOpenModal } = useImageModal();

  return (
    <MainContainer>
      <LabelContainer>
        <Label htmlFor="post_image">썸네일:</Label>
      </LabelContainer>
      <ImageContainer>
        <ImageContent>
          {image.length > 0 ? (
            <>{/* <Image/> */}</>
          ) : (
            <IconContainer>
              <ImageIcon color={"#cccccc"} />
            </IconContainer>
          )}
          <ImageButton onClick={() => clickModal()}>썸네일 바꾸기</ImageButton>
        </ImageContent>
        {isOpenModal && (
          <Portal
            selector={"modal"}
            children={<ImageModal image={image} setImage={setImage} />}
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

const LabelContainer = styled.div``;

const Label = styled.label`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: var(--color-text-label);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-5);
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
  background: hsl(210, 8%, 35%);
  border-radius: 0 0 10px 10px;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
  color: white;
`;

const IconContainer = styled.div`
  width: 200px;
`;
