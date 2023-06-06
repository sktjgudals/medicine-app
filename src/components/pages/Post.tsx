import { FC } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { PostGetData } from "apollo/querys/post";

import { SESSIONTYPE } from "@/types/session";

import Title from "../atoms/Title";
import ApolloError from "../atoms/ApolloError";
import PostComment from "../molecules/Desktop/Post/Comment/PostComment";
import NotFound from "./404";
import PostContents from "../organisms/Post/PostContents";

interface Props {
  session: SESSIONTYPE | null;
  num: string;
}

const Post: FC<Props> = ({ session, num }) => {
  const { loading, data, error, refetch } = useQuery(PostGetData, {
    variables: { userId: session ? session.id : null, num: Number(num) },
  });

  if (loading) return <></>;
  if (error)
    return (
      <div onClick={() => refetch()}>
        <Title title={`오류 - 약정`} content={"약을 찾아주는 요정"} />
        <ApolloError
          title={"글을 불러오는 도중 오류가 발생하였습니다."}
          body={"새로고침을 시도하거나 여기를 클릭하여주세요."}
        />
      </div>
    );

  const res = data.postGetData;

  if (res.error) {
    return (
      <>
        <Title title={`오류 - 약정`} content={"약을 찾아주는 요정"} />;
        <NotFound />
      </>
    );
  }
  return (
    <MainContainer>
      <Title
        title={`${res.post.title} - 약정`}
        content={"약을 찾아주는 요정"}
      />
      <PostContents post={res.post} session={session} />
      <PostComment postId={res.post.id} />
    </MainContainer>
  );
};

export default Post;

const MainContainer = styled.div`
  padding-top: 53px;
  width: 100%;
  height: 100%;
  margin auto 0;
`;
