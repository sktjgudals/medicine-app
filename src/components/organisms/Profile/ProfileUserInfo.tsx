import { FC } from "react";
import styled from "styled-components";

import { SESSIONTYPE } from "@/types/session";
import { User_TYPE } from "@/types/user";

import ProfileUserImage from "@/components/molecules/Desktop/Profile/ProfileUserImage";
import ProfileUserNickname from "@/components/molecules/Desktop/Profile/ProfileUserNickname";
import ProfileUserIntro from "@/components/molecules/Desktop/Profile/ProfileUserIntro";
import ProfileSettingLink from "@/components/molecules/Desktop/Profile/ProfileSettingLink";
import MobileSettingLink from "@/components/molecules/Desktop/Profile/MobileSettingLink";

interface Props {
  user: User_TYPE;
  session: SESSIONTYPE | null;
}

const ProfileUserInfo: FC<Props> = ({ user, session }) => {
  return (
    <MainContainer>
      <MainContents>
        <ProfileUserImage image={user.image} />
        <InfoContainer>
          <ProfileUserNickname nickname={user.nickname} />
          <ProfileUserIntro
            introduction={user.introduction}
            createdAt={user.createdAt}
          />
        </InfoContainer>
        {session && (
          <ProfileSettingLink sessionId={session.id} userId={user.id} />
        )}
      </MainContents>
      {session && <MobileSettingLink sessionId={session.id} userId={user.id} />}
    </MainContainer>
  );
};

export default ProfileUserInfo;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
  margin-bottom: 50px;
`;

const MainContents = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  margin: 8px;
  background: var(--color-modal-default-background);
  border-radius: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 20px;
`;
