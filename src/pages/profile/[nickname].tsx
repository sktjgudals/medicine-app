import { FC } from "react";
import { GetServerSideProps } from "next";
import Title from "@/components/atoms/Title";
import NotFoundPage from "../404";

interface Props {
  nickname: string;
}

const ProfilePage: FC<Props> = ({ nickname }) => {
  if (!nickname) return <NotFoundPage />;
  return (
    <div>
      <Title title={`프로필 - 약정`} content={"약을 찾아주는 요정"} />;
    </div>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { nickname } = context.query;
  if (!nickname) {
    return { props: {} };
  }
  return { props: { nickname } };
};
