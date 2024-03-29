import { FC } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import Title from "@/components/atoms/Title";

import { useQuery } from "@apollo/client";
import { GetProfileData } from "apollo/querys/profile";
import ApolloError from "@/components/atoms/ApolloError";
import NotFound from "@/components/pages/404";

import SKProfile from "@/components/molecules/Desktop/Skeleton/SKProfile";

const ProfilePage = dynamic(() => import("@/components/pages/ProfilePage"), {
  ssr: false,
  loading: () => null,
});

interface Props {
  nickname: string;
}

const Profile: FC<Props> = ({ nickname }) => {
  if (!nickname)
    return (
      <>
        <Title
          title={`오류 - 약정`}
          content={`약을 찾아주는 요정  오류 페이지입니다.`}
        />
        <NotFound />
      </>
    );

  const { data, loading, error, fetchMore } = useQuery(GetProfileData, {
    variables: { nickname, limit: 5 },
  });

  if (loading)
    return (
      <>
        <Title
          title={`${nickname} - 약정`}
          content={`약을 찾아주는 요정 ${nickname}님 프로필 페이지입니다.`}
        />
        <SKProfile />
      </>
    );
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
  if (!data.getProfileData) {
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
  const handlerFetchMore = () => {
    if (data && data.getProfileData.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          limit: 5,
          cursor:
            data.getProfileData.posts[data.getProfileData.posts.length - 1].id,
          postUserId: data.getProfileData.user.id,
        },
      });
    }
  };

  return (
    <>
      <Title
        title={`${nickname} - 약정`}
        content={`약을 찾아주는 요정 ${nickname}님 프로필 페이지입니다.`}
      />
      <ProfilePage profile={data.getProfileData} cb={handlerFetchMore} />
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
