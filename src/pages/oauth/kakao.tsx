import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { oauthKakaoUserCode } from "@/utils/func/oauth";

import Title from "@/components/atoms/Title";
import { tokenSet } from "@/utils/varible";

interface Props {
  access_token: string | null;
  refresh_token: string | null;
}

const Kakao: FC<Props> = ({ access_token, refresh_token }) => {
  const router = useRouter();
  useEffect(() => {
    if (access_token && refresh_token) {
      tokenSet(access_token, refresh_token);
      const redirect_uri = localStorage.getItem("redirect_uri");
      if (redirect_uri) {
        router.push(redirect_uri as string);
        router.reload();
        localStorage.removeItem("redirect_uri");
      } else {
        router.push("/");
        router.reload();
      }
    }
  }, [access_token, refresh_token]);

  return (
    <>
      <Title title={"카카오 로그인 - 약정"} content={"약을 찾아주는 요정"} />
    </>
  );
};

export default Kakao;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code as string;
  if (code) {
    const res = await oauthKakaoUserCode(code);
    if (res) {
      return {
        props: {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
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
  }
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
