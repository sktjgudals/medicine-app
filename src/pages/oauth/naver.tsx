import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Title from "@/components/atoms/Title";
import { GetServerSideProps } from "next";
import { oauthNaverUserCode } from "@/utils/func/oauth";
import { tokenSet } from "@/utils/varible";
import NotFoundPage from "../404";

interface Props {
  access_token: string | null;
  refresh_token: string | null;
}

const Naver: FC<Props> = ({ access_token, refresh_token }) => {
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
      <Title title={"네이버 로그인 - 약정"} content={"약을 찾아주는 요정"} />
      <NotFoundPage />
    </>
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
