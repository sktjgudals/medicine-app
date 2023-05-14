import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { postThumbnail } from "apollo/cache";
import useImageModal from "@/hooks/useImageModal";

import ImageModal from "./ImageModal";
import Portal from "@/components/atoms/Portal";
import ImageIcon from "@/components/atoms/icons/imageIcon";
import { useReactiveVar } from "@apollo/client";

const ImageEditor: FC = () => {
  const thumbnail = useReactiveVar(postThumbnail);
  const { clickModal, isOpenModal } = useImageModal();

  return (
    <MainContainer>
      <LabelContainer>
        <Label htmlFor="post_image">썸네일:</Label>
      </LabelContainer>
      <ImageContainer>
        <ImageContent>
          {thumbnail.length > 0 ? (
            <Image src={thumbnail} width={200} height={200} alt="image" />
          ) : (
            <IconContainer>
              <ImageIcon color={"#cccccc"} />
            </IconContainer>
          )}
          <ImageButton onClick={() => clickModal()}>썸네일 바꾸기</ImageButton>
        </ImageContent>
        {isOpenModal && <Portal selector={"modal"} children={<ImageModal />} />}
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
