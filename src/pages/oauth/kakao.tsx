import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { oauthKakaoUserCode } from "@/utils/func/oauth";

import Title from "@/components/atoms/Title";
import { tokenSet } from "@/utils/varible";
import NotFoundPage from "../404";

interface Props {
  access_token: string | null;
  refresh_token: string | null;
}

const Kakao: FC<Props> = ({ access_token, refresh_token }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (access_token && refresh_token) {
      tokenSet(access_token, refresh_token);
      const redirect_uri = localStorage.getItem("redirect_uri");
      if (redirect_uri) {
        router.push(redirect_uri as string);
        router.reload();
        localStorage.removeItem("redirect_uri");
        setLoading(false);
      } else {
        router.push("/");
        router.reload();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [access_token, refresh_token]);

  if (loading) return <></>;
  return (
    <>
      <Title title={"카카오 로그인 - 약정"} content={"약을 찾아주는 요정"} />
      <NotFoundPage />
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
