import { FC } from "react";
import { useRouter } from "next/router";

import Title from "@/components/atoms/Title";
import PostComponent from "@/components/pages/PostCreate";
import { useSession } from "@/hooks/useSession";

const Post: FC = () => {
  const router = useRouter();
  const { loading, session } = useSession();
  if (loading)
    return <Title title={"작성 - 약정"} content={"약을 찾아주는 요정"} />;
  if (!session) router.push("/");
  return (
    <>
      <Title title={"작성 - 약정"} content={"약을 찾아주는 요정"} />
      {session && <PostComponent />}
    </>
  );
};

export default Post;
