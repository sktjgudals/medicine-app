import { FC } from "react";
import prisma from "prisma/prisma";
import { GetServerSideProps } from "next";

import { useSession } from "@/hooks/useSession";
import { POST_TYPE } from "@/types/post";

import NotFoundPage from "@/pages/404";
import Title from "@/components/atoms/Title";
import PostEditPage from "@/components/pages/PostEditPage";

interface Props {
  post: string | null;
}

const edit: FC<Props> = ({ post }) => {
  const { loading, session } = useSession();
  if (loading) return <Title title={`약정`} content={"약을 찾아주는 요정"} />;
  if (session) {
    if (post) {
      const postParse = JSON.parse(post) as POST_TYPE;
      if (session.id === postParse.user.id) {
        return (
          <>
            <Title title={`수정 - 약정`} content={"약을 찾아주는 요정"} />
            <PostEditPage {...postParse} />
          </>
        );
      } else {
        return <NotFoundPage />;
      }
    } else {
      return <NotFoundPage />;
    }
  } else {
    return <NotFoundPage />;
  }
};

export default edit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { num } = context.query;
    if (!num) {
      return {
        props: {},
        redirect: "/",
      };
    }
    const post = await prisma.post.findFirst({
      where: { num: Number(num) },
      include: {
        user: {
          select: { id: true, nickname: true, image: true },
        },
        tag: { select: { id: true, name: true } },
      },
    });
    if (post) {
      return { props: { post: JSON.stringify(post) } };
    } else {
      return { props: { post: null } };
    }
  } catch (e) {
    return { props: { post: null } };
  }
};
