import { FC } from "react";
import styled from "styled-components";

import PostBody from "@/components/molecules/Desktop/Post/PostBody";
import PostHeader from "@/components/molecules/Desktop/Post/PostHeader";
import { POST_TYPE } from "@/types/post";

const PostContents: FC<POST_TYPE> = ({ id, title, body, user }) => {
  return (
    <MainContainer>
      <PostHeader title={title} user={user} />
      <PostBody />
    </MainContainer>
  );
};

export default PostContents;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1024px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
`;
