import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import Title from "@/components/atoms/Title";
import { GetServerSideProps } from "next";
import { oauthNaverUserCode } from "@/utils/func/oauth";
import { signInSetToken } from "@/utils/func/signin";

interface Props {
  access_token: string | null;
  refresh_token: string | null;
}

const Naver: FC<Props> = ({ access_token, refresh_token }) => {
  const router = useRouter();

  useEffect(() => {
    if (access_token && refresh_token) {
      signInSetToken(access_token, refresh_token);
      const redirect_uri = localStorage.getItem("redirect_uri");
      if (redirect_uri) {
        router.push(redirect_uri as string);
        localStorage.removeItem("redirect_uri");
      }
    }
  }, [access_token, refresh_token]);
  return (
    <Title title={"네이버 로그인 - 약정"} content={"약을 찾아주는 요정"} />
  );
};

export default Naver;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code as string;
  const state = context.query.state as string;
  if (code && state) {
    const res = await oauthNaverUserCode(code, state);
    if (res) {
      return {
        props: {
          access_token: res["access_token"],
          refresh_token: res["refresh_token"],
        },
      };
    } else {
      return {
        props: {
          access_token: null,
          refresh_token: null,
          error: true,
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
