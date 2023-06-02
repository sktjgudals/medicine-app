import { FC, lazy, memo } from "react";
import styled from "styled-components";

import PostCommentList from "./PostCommentList";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/router";

const LazyEditor = memo(lazy(() => import("../Editor/CommentEditor")));

const PostComment: FC = () => {
  const { session } = useSession();
  const router = useRouter();
  const loginHandler = () => {
    router.push("/signup");
  };
  return (
    <MainContainer>
      {session ? (
        <LazyEditor session={session} />
      ) : (
        <CommentTextContainer onClick={loginHandler}>
          <CommentNotSession>
            댓글 작성은 로그인이 필요한 서비스입니다.
          </CommentNotSession>
          <CommentNotSession>
            클릭하시면 회원가입 페이지로 이동합니다.
          </CommentNotSession>
        </CommentTextContainer>
      )}
      <PostCommentList />
    </MainContainer>
  );
};

export default PostComment;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const CommentNotSession = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: var(--font-size-8);
`;

const CommentTextContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  cursor: pointer;
`;
