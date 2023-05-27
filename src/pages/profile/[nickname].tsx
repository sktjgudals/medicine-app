import { FC } from "react";
import { GetServerSideProps } from "next";
import Title from "@/components/atoms/Title";
import NotFoundPage from "../404";
import ProfilePage from "@/components/pages/ProfilePage";
import { useSession } from "@/hooks/useSession";

interface Props {
  nickname: string;
}

const Profile: FC<Props> = ({ nickname }) => {
  const { loading, session } = useSession();
  if (loading) return <></>;
  if (!nickname) return <NotFoundPage />;
  return (
    <>
      <Title
        title={`${nickname} - 약정`}
        content={`약을 찾아주는 요정 ${nickname}님 프로필 페이지입니다.`}
      />
      <ProfilePage session={session} />
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { nickname } = context.query;
  if (!nickname) {
    return { props: {} };
  }
  return { props: { nickname } };
};
