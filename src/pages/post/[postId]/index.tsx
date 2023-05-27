import { FC } from "react";
import Title from "@/components/atoms/Title";
import Post from "@/components/pages/Post";
import { useSession } from "@/hooks/useSession";
import { GetServerSideProps } from "next";
import NotFoundPage from "@/pages/404";

interface Props {
  postId: string;
}

const PostNumber: FC<Props> = ({ postId }) => {
  const { loading, session } = useSession();
  if (loading) return <Title title={`약정`} content={"약을 찾아주는 요정"} />;
  if (postId) {
    return <Post session={session} postId={postId} />;
  } else {
    return <NotFoundPage />;
  }
};

export default PostNumber;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;
  if (!postId) {
    return { props: {} };
  }
  return { props: { postId } };
};
