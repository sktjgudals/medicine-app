import { useQuery } from "@apollo/client";
import { CommentsQuery } from "apollo/querys/comment";
import { FC, useCallback } from "react";
import styled from "styled-components";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import ApolloError from "@/components/atoms/ApolloError";
import Loading from "@/components/atoms/Loading";
import CommentContent from "./CommentContent";
import { Comment_Type } from "@/types/comment";

interface Props {
  postId: string;
  userId: string | undefined;
}

const PostCommentList: FC<Props> = ({ postId, userId }) => {
  const { data, loading, error, fetchMore } = useQuery(CommentsQuery, {
    variables: { postId, userId, limit: 5, sort: "new" },
  });

  const getfetchMore = useCallback(() => {
    if (data && data.getComments.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          limit: 10,
          cursor:
            data.getComments.comments[data.getComments.comments.length - 1].id,
        },
      });
    }
  }, [data, fetchMore]);
  const [ref, setRef] = useInfiniteScroll(getfetchMore);
  if (loading) return <></>;
  if (error)
    return (
      <ApolloError
        title="댓글 오류"
        body="새로고침을 시도하여 주시기 바랍니다."
      />
    );
  const { comments, pageInfo } = data.getComments;

  return (
    <MainContainer>
      {comments.length > 0 &&
        comments.map((comment: Comment_Type) => (
          <CommentContent {...comment} key={comment.id} />
        ))}
      {pageInfo.hasNextPage && (
        <LoadingContainer ref={setRef}>
          <Loading
            width={40}
            height={40}
            strokeWidth={10}
            top={0}
            bottom={0}
            right={0}
            left={0}
          />
        </LoadingContainer>
      )}
    </MainContainer>
  );
};

export default PostCommentList;

const MainContainer = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1024px;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justifycontent: center;
  padding: 20px 0px;
`;
