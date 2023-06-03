import { FC } from "react";
import styled from "styled-components";
import ImageIcon from "@/components/atoms/icons/imageIcon";

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
        <ImageContainer>
          <img src={thumbnail} alt="thumbnail_image" />
        </ImageContainer>
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
  display: flex;
  width: 50px;
  height: 50px;
  @media screen and (max-width: 700px) {
    width: 30px;
    height: 30px;
  }
`;
