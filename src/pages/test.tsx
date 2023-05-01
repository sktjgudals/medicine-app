import Title from "@/components/atoms/Title";
import { GetServerSideProps } from "next";
import { FC } from "react";
import styled from "styled-components";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const test: FC = () => {
  const googleHandler = () => {
    fetcher("/api/v1/google/url").then(({ url }) => {
      if (url) window.location.href = url;
    });
  };
  return (
    <Container>
      <Title title={"테스트 - 약정"} content={"약을 찾아주는 요정"} />
      <button onClick={googleHandler}>구글 url 요청</button>
    </Container>
  );
};

export default test;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
