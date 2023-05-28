import { FC } from "react";
import { GetServerSideProps } from "next";
import Title from "@/components/atoms/Title";
import ProfilePage from "@/components/pages/ProfilePage";

import { useQuery } from "@apollo/client";
import { GetProfileData } from "apollo/querys/profile";
import ApolloError from "@/components/atoms/ApolloError";
import NotFound from "@/components/pages/404";

interface Props {
  nickname: string;
}

const Profile: FC<Props> = ({ nickname }) => {
  if (!nickname)
    return (
      <>
        <Title
          title={`오류 - 약정`}
          content={`약을 찾아주는 요정 ${nickname}님 프로필 페이지입니다.`}
        />
        <NotFound />
      </>
    );

  const { data, loading, error } = useQuery(GetProfileData, {
    variables: { nickname },
  });
  console.info(data);
  if (loading) return <></>;
  if (error)
    return (
      <>
        <Title
          title={`${nickname} - 약정`}
          content={`약을 찾아주는 요정 ${nickname}님 프로필 페이지입니다.`}
        />
        <ApolloError
          title="유저 정보를 불러오는 도중 오류가 발생했습니다."
          body={"새로고침을 하시거나 주소를 다시 한번 확인해주세요."}
        />
      </>
    );
  if (!data.getProfileData.user) {
    return (
      <>
        <Title
          title={`${nickname} - 약정`}
          content={`약을 찾아주는 요정 ${nickname}님 프로필 페이지입니다.`}
        />
        <ApolloError
          title="해당하는 유저가 없습니다."
          body={"새로고침을 하시거나 주소를 다시 한번 확인해주세요."}
        />
      </>
    );
  }

  return (
    <>
      <Title
        title={`${nickname} - 약정`}
        content={`약을 찾아주는 요정 ${nickname}님 프로필 페이지입니다.`}
      />
      <ProfilePage {...data.getProfileData} />
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
