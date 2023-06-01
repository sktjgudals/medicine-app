import { FC } from "react";
import styled from "styled-components";

import HeartToolBar from "./Toolbar/HeartToolBar";
import LinkToolBar from "./Toolbar/LinkToolBar";
import DeleteToolBar from "./Toolbar/DeleteToolBar";
import ReEditToolBar from "./Toolbar/ReEditToolBar";

interface Props {
  isLike: boolean;
  likeCount: number;
  userId: string | null;
  postUserId: string;
  postId: string;
}

const PostToolBar: FC<Props> = ({
  isLike,
  likeCount,
  userId,
  postUserId,
  postId,
}) => {
  return (
    <MainContainer>
      <HeartToolBar
        postId={postId}
        isLike={isLike}
        likeCount={likeCount}
        userId={userId}
      />
      <LinkToolBar />
      {userId === postUserId && (
        <>
          <ReEditToolBar />
          <DeleteToolBar />
        </>
      )}
    </MainContainer>
  );
};

export default PostToolBar;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  gap: 10px;
`;
