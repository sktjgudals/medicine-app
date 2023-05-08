import { FC } from "react";
import Title from "@/components/atoms/Title";
import PostComponent from "@/components/pages/Post";
import { GetServerSideProps } from "next";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/router";
import { SESSIONTYPE } from "@/types/session";

const Post: FC = () => {
  const router = useRouter();
  const { loading, session } = useSession();
  if (loading) return <></>;
  if (!session) router.push("/");
  return (
    <>
      <Title title={"작성 - 약정"} content={"약을 찾아주는 요정"} />
      <PostComponent session={session as SESSIONTYPE} />
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};
