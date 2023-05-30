import { FC } from "react";
import ProfileUserInfo from "../organisms/Profile/ProfileUserInfo";
import ProfilePostInfo from "../organisms/Profile/ProfilePostInfo";
import styled from "styled-components";
import { useSession } from "@/hooks/useSession";
import { PROFILE_DATA } from "@/types/profile";

const ProfilePage: FC<PROFILE_DATA> = ({ user, posts }) => {
  const { loading, session } = useSession();
  if (loading) return <></>;

  return (
    <MainContainer>
      <ProfileUserInfo user={user} session={session} />
      <ProfilePostInfo posts={posts} session={session} user={user} />
    </MainContainer>
  );
};

export default ProfilePage;

const MainContainer = styled.main`
  padding: 56px 30px 40px 30px;
`;
