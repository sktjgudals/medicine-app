import { FC } from "react";
import styled from "styled-components";

import HeartToolBar from "./Toolbar/HeartToolBar";
import LinkToolBar from "./Toolbar/LinkToolBar";

interface Props {
  isLike: boolean;
  likeCount: number;
  userId: string | null;
  postId: string;
}

const PostToolBar: FC<Props> = ({ isLike, likeCount, userId, postId }) => {
  return (
    <MainContainer>
      <HeartToolBar
        postId={postId}
        isLike={isLike}
        likeCount={likeCount}
        userId={userId}
      />
      <LinkToolBar />
    </MainContainer>
  );
};

export default PostToolBar;

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100px;
  gap: 10px;
`;
