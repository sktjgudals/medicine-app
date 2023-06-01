import { FC, useCallback, useEffect } from "react";
import styled from "styled-components";

import PostBody from "@/components/molecules/Desktop/Post/PostBody";
import PostHeader from "@/components/molecules/Desktop/Post/PostHeader";
import { POST_TYPE } from "@/types/post";
import { useMutation } from "@apollo/client";
import { PostViewMutation } from "apollo/querys/post";
import { debounceFunc } from "@/utils/func/common";

const PostContents: FC<POST_TYPE> = ({
  id,
  title,
  body,
  user,
  views,
  createdAt,
}) => {
  const [mutateFunc, { loading, error }] = useMutation(PostViewMutation);

  const viewUpsert = useCallback(
    debounceFunc(
      () => mutateFunc({ variables: { postId: id, views: views } }),
      2000
    ),
    []
  );
  useEffect(() => {
    viewUpsert();
  }, [viewUpsert]);

  return (
    <MainContainer>
      <PostContainer>
        <PostHeader
          title={title}
          user={user}
          views={views}
          createdAt={createdAt}
        />
        <PostBody body={body} />
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
