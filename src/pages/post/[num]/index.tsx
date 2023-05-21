import { FC } from "react";
import Title from "@/components/atoms/Title";
import Post from "@/components/pages/Post";
import { useSession } from "@/hooks/useSession";
import { GetServerSideProps } from "next";
import NotFoundPage from "@/pages/404";

interface Props {
  num: number;
}

const PostNumber: FC<Props> = ({ num }) => {
  const { loading, session } = useSession();
  if (loading) return <Title title={`약정`} content={"약을 찾아주는 요정"} />;
  if (num) {
    return <Post session={session} num={num} />;
  } else {
    return <NotFoundPage />;
  }
};

export default PostNumber;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { num } = context.query;
  const result = Number(num);
  if (!result) {
    return { props: {} };
  }
  return { props: { num } };
};
