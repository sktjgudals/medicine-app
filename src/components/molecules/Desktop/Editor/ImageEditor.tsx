import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { editorThumbnail } from "apollo/cache";
import useImageModal from "@/hooks/useImageModal";

import ImageModal from "./ImageModal";
import Portal from "@/components/atoms/Portal";
import ImageIcon from "@/components/atoms/icons/imageIcon";
import { useReactiveVar } from "@apollo/client";

const ImageEditor: FC = () => {
  const thumbnail = useReactiveVar(editorThumbnail);
  const { clickModal, isOpenModal } = useImageModal();

  return (
    <MainContainer>
      <ImageContainer>
        <ImageContent onClick={() => clickModal()}>
          {thumbnail.length > 0 ? (
            <Image src={thumbnail} width={200} height={200} alt="image" />
          ) : (
            <IconContainer>
              <ImageIcon color={"#cccccc"} />
            </IconContainer>
          )}
          <ImageButton>썸네일 업로드</ImageButton>
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
  border-radius: 0 0 10px 10px;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: var(--color-green-10);
  &:hover {
    background: var(--color-green-11);
  }
`;

const IconContainer = styled.div`
  width: 200px;
`;
