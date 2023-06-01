import ImageIcon from "@/components/atoms/icons/imageIcon";
import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  thumbnail: string;
}

const PostListThumbnail: FC<Props> = ({ thumbnail }) => {
  return (
    <MainContainer>
      {thumbnail.length === 0 ? (
        <ImageContainer>
          <ImageIcon />
        </ImageContainer>
      ) : (
        <Image src={thumbnail} width={50} height={50} alt="thumbnail_image" />
      )}
    </MainContainer>
  );
};

export default PostListThumbnail;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
`;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
`;
