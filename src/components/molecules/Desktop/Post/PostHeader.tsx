import { FC } from "react";
import styled from "styled-components";
import PostHeaderUser from "./PostHeaderUser";
import { User_TYPE } from "@/types/user";

interface Props {
  title: string;
  user: User_TYPE;
}

const PostHeader: FC<Props> = ({ title, user }) => {
  return (
    <MainContainer>
      <Title>{title}</Title>
      <PostHeaderUser {...user} />
    </MainContainer>
  );
};

export default PostHeader;

const MainContainer = styled.div``;

const Title = styled.h1`
  letter-spacing: -0.006em;
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-bold);
  margin-bottom: 25px;
  margin-top: 10px;
  padding-left: 10px;
  word-break: keep-all;
  background-color: red;
`;
