import { User_TYPE } from "@/types/user";
import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";

const PostHeaderUser: FC<User_TYPE> = ({ id, nickname, image }) => {
  console.info(image);
  return (
    <MainContainer>
      <ImageContainer>
        {image ? (
          <Image
            src={image}
            width={100}
            height={100}
            alt="post_profile_image"
          />
        ) : (
          ""
        )}
      </ImageContainer>
      <NickNameContainer>{nickname}</NickNameContainer>
    </MainContainer>
  );
};

export default PostHeaderUser;

const MainContainer = styled.div``;

const NickNameContainer = styled.div``;

const ImageContainer = styled.a`
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 4px;
  vertical-align: top;
  user-select: none;
`;

const ImageContent = styled.a``;
