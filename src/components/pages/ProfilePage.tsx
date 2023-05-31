import { FC } from "react";
import ProfileUserInfo from "../organisms/Profile/ProfileUserInfo";
import ProfilePostInfo from "../organisms/Profile/ProfilePostInfo";
import styled from "styled-components";
import { useSession } from "@/hooks/useSession";
import { PROFILE_DATA } from "@/types/profile";

interface Props {
  profile: PROFILE_DATA;
  cb: () => void;
}

const ProfilePage: FC<Props> = ({ profile, cb }) => {
  const { loading, session } = useSession();
  if (loading) return <></>;
  return (
    <MainContainer>
      <ProfileUserInfo user={profile.user} session={session} />
      <ProfilePostInfo
        cb={cb}
        posts={profile.posts}
        session={session}
        user={profile.user}
        pageInfo={profile.pageInfo}
      />
    </MainContainer>
  );
};

export default ProfilePage;

const MainContainer = styled.main`
  padding: 56px 30px 40px 30px;
`;
