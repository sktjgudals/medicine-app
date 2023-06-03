import { FC } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import PostCommentList from "./PostCommentList";
import { useSession } from "@/hooks/useSession";

const CommentEditor = dynamic(() => import("../../Editor/CommentEditor"), {
  ssr: false,
  loading: () => null,
});

interface Props {
  postId: string;
}

const PostComment: FC<Props> = ({ postId }) => {
  const { session } = useSession();
  const router = useRouter();
  const loginHandler = () => {
    router.push("/signup");
  };
  return (
    <MainContainer>
      {session ? (
        <CommentEditor postId={postId} session={session} />
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
      <PostCommentList postId={postId} userId={session?.id} />
    </MainContainer>
  );
};

export default PostComment;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
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
