import { FC } from "react";
import styled from "styled-components";

import Title from "../molecules/Desktop/Editor/Title";
import Tag from "../molecules/Desktop/Editor/Tag";
import { lazy, memo } from "react";
import ImageEditor from "../molecules/Desktop/Editor/ImageEditor";
const LazyEditor = memo(
  lazy(() => import("../molecules/Desktop/Editor/MainEditor"))
);

const Post: FC = () => {
  return (
    <HeightContainer>
      <MainContainer>
        <Title />
        <Tag />
        <ImageEditor />
        <LazyEditor />
      </MainContainer>
    </HeightContainer>
  );
};

export default Post;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
`;

const HeightContainer = styled.div`
  padding-top: 52px;
`;
