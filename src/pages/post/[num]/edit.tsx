import { FC } from "react";
import { GetServerSideProps } from "next";
import prisma from "prisma/prisma";
import { useSession } from "@/hooks/useSession";

interface Props {}

const edit: FC<Props> = () => {
  const { loading, session } = useSession();
  if (loading) return <></>;

  return <div></div>;
};

export default edit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { num } = context.query;
  if (!num) {
    return { props: {} };
  }
  const result = await prisma.post.findFirst({ where: { num: Number(num) } });
  console.info(result);
  return { props: {} };
};
