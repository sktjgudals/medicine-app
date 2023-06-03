import { FC } from "react";
import styled from "styled-components";
import DeleteToolBar from "./DeleteToolBar";
import ReEditToolBar from "./ReEditToolBar";

interface Props {
  userId: string | null;
  commentId: string;
  commentUserId: string;
}

const CommentToolBar: FC<Props> = ({ commentId, userId, commentUserId }) => {
  return (
    <MainContainer>
      {userId === commentUserId && (
        <>
          <ReEditToolBar commentId={commentId} />
          <DeleteToolBar commentId={commentId} userId={userId} />
        </>
      )}
    </MainContainer>
  );
};

export default CommentToolBar;

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 10px;
  gap: 10px;
`;
