import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import { oauth2Client } from "@/utils/func/oauth";
import Title from "@/components/atoms/Title";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

interface Token {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

interface Props {
  token: Token;
  error: boolean;
}

const Google: FC<Props> = ({ token, error }) => {
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push(
        `/google/classroom?access_token=${token.access_token}&refresh_token=${token.refresh_token}`
      );
    }
  }, [token]);
  return (
    <>
      <Title title={"구글 클래스룸- 약정"} content={"약을 찾아주는 요정"} />
      <Container></Container>
    </>
  );
};

export default Google;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code as string;
  try {
    if (code) {
      const { tokens } = await oauth2Client.getToken(code);
      return {
        props: {
          token: tokens,
        },
        redirect: {
          permanent: false,
          destination: `/google/classroom?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`,
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  } catch (e) {
    return {
      props: { error: true },
    };
  }
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
