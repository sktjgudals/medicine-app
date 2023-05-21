import { FC } from "react";
import { useQuery } from "@apollo/client";
import { PostGetData } from "apollo/querys/post";

import { SESSIONTYPE } from "@/types/session";

import PostBody from "../molecules/Desktop/Post/PostBody";
import styled from "styled-components";
import Title from "../atoms/Title";
import ApolloError from "../atoms/ApolloError";
import PostComment from "../molecules/Desktop/Post/PostComment";

interface Props {
  session: SESSIONTYPE | null;
  num: number;
}

const Post: FC<Props> = ({ session, num }) => {
  const { loading, data, error, refetch } = useQuery(PostGetData, {
    variables: { userId: session ? session.id : null, num: Number(num) },
  });
  const refetchHandler = () => {
    refetch();
  };

  if (loading) return <></>;
  if (error)
    return (
      <div onClick={refetchHandler}>
        <ApolloError
          title={"글을 불러오는 도중 오류가 발생하였습니다."}
          body={"새로고침을 시도하거나 여기를 클릭하여주세요."}
        />
      </div>
    );
  return (
    <>
      <MainContainer>
        <Title title={`약정`} content={"약을 찾아주는 요정"} />
        <PostBody />
        <PostComment />
      </MainContainer>
    </>
  );
};

export default Post;

const MainContainer = styled.div``;
