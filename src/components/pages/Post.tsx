import { SESSIONTYPE } from "@/types/session";
import { FC } from "react";
import styled from "styled-components";

import Title from "../molecules/Desktop/Editor/Title";
import Tag from "../molecules/Desktop/Editor/Tag";
import { lazy, Suspense } from "react";
import Loading from "../atoms/Loading";
const LazyEditor = lazy(() => import("../molecules/Desktop/Editor/MainEditor"));

interface Props {
  session: SESSIONTYPE;
}

const Post: FC<Props> = ({ session }) => {
  //   console.info(session);
  const renderLoader = () => (
    <LoadingContainer>
      <Loading
        width={80}
        height={80}
        strokeWidth={10}
        top={0}
        bottom={0}
        right={0}
        left={0}
      />
    </LoadingContainer>
  );

  return (
    <HeightContainer>
      <MainContainer>
        <Title />
        <Tag />
        <Suspense fallback={renderLoader()}>
          <LazyEditor />
        </Suspense>
      </MainContainer>
    </HeightContainer>
  );
};

export default Post;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 100px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
`;

const HeightContainer = styled.div`
  padding-top: 52px;
`;

// const;
