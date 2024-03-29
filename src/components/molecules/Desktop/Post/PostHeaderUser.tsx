import { User_TYPE } from "@/types/user";

import { FC } from "react";
import styled from "styled-components";
import CircleImage from "@/components/atoms/CircleImage";

const PostHeaderUser: FC<User_TYPE> = ({ id, nickname, image }) => {
  return (
    <MainContainer>
      <CircleImage image={image} width={30} height={30} />
      <NickNameContainer>{nickname}</NickNameContainer>
    </MainContainer>
  );
};

export default PostHeaderUser;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

const NickNameContainer = styled.div`
  font-size: var(--font-size-9);
`;
