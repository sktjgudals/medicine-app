import { User_TYPE } from "@/types/user";

import { FC } from "react";
import styled from "styled-components";
import CircleImage from "@/components/atoms/CIrcleImage";

const PostHeaderUser: FC<User_TYPE> = ({ id, nickname, image }) => {
  console.info(image);
  return (
    <MainContainer>
      <CircleImage image={image} width={50} height={50} />
      <NickNameContainer>{nickname}</NickNameContainer>
    </MainContainer>
  );
};

export default PostHeaderUser;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const NickNameContainer = styled.div``;
