import { FC, useCallback, useEffect } from "react";
import styled from "styled-components";

import PostBody from "@/components/molecules/Desktop/Post/PostBody";
import PostHeader from "@/components/molecules/Desktop/Post/PostHeader";
import { POST_TYPE } from "@/types/post";
import { useMutation } from "@apollo/client";
import { PostViewMutation } from "apollo/querys/post";
import { debounceFunc } from "@/utils/func/common";
import PostToolBar from "@/components/molecules/Desktop/Post/PostToolBar";
import { SESSIONTYPE } from "@/types/session";
import PostTagBar from "@/components/molecules/Desktop/Post/PostTagBar";

interface Props {
  post: POST_TYPE;
  session: SESSIONTYPE | null;
}

const PostContents: FC<Props> = ({ post, session }) => {
  const [mutateFunc, { loading, error }] = useMutation(PostViewMutation);
  const viewUpsert = useCallback(
    debounceFunc(
      () => mutateFunc({ variables: { postId: post.id, views: post.views } }),
      2000
    ),
    []
  );
  useEffect(() => {
    viewUpsert();
  }, [viewUpsert]);
  console.info(post.tag);
  return (
    <MainContainer>
      <PostContainer>
        <PostHeader
          id={post.id}
          title={post.title}
          user={post.user}
          views={post.views}
          createdAt={post.createdAt}
          userId={session ? session.id : null}
          thumbnail={post.thumbnail.length !== 0 ? post.thumbnail : null}
        />
        <PostBody body={post.body} />
        <PostTagBar />
        <PostToolBar
          postId={post.id}
          isLike={post.isLike}
          likeCount={post.likeCount}
          userId={session ? session.id : null}
        />
      </PostContainer>
    </MainContainer>
  );
};

export default PostContents;

const MainContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const PostContainer = styled.div`
  height: 100%;
  max-width: 1024px;
  width: 100%;
`;
