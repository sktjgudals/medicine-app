import { FC } from "react";
import { useQuery } from "@apollo/client";
import { PostGetData } from "apollo/querys/post";

import { SESSIONTYPE } from "@/types/session";

import PostBody from "../molecules/Desktop/Post/PostBody";
import styled from "styled-components";
import Title from "../atoms/Title";

interface Props {
  session: SESSIONTYPE | null;
  num: number;
}

const Post: FC<Props> = ({ session, num }) => {
  const { loading, data, error } = useQuery(PostGetData, {
    variables: { userId: session ? session.id : null, num: Number(num) },
  });

  if (loading) return <></>;
  if (error) return <>error</>;
  console.info(data);
  return (
    <MainContainer>
      <Title title={`약정`} content={"약을 찾아주는 요정"} />
      <PostBody />
    </MainContainer>
  );
};

export default Post;

const MainContainer = styled.div``;
