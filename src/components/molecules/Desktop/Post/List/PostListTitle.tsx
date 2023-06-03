import { FC } from "react";
import styled from "styled-components";

const PostListTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <MainContainer>
      <TitleContainer>{title}</TitleContainer>
    </MainContainer>
  );
};

export default PostListTitle;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  align-items: center;
  padding-left: 10px;
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-bold);
`;

const TitleContainer = styled.p`
  display: -webkit-box;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;
