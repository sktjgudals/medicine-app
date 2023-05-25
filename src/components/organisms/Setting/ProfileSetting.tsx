import SettingImage from "@/components/molecules/Desktop/Setting/Profile/SettingImage";
import SettingNickName from "@/components/molecules/Desktop/Setting/Profile/SettingNickName";
import SettingIntroduction from "@/components/molecules/Desktop/Setting/Profile/SettingIntroduction";
import { FC, useEffect } from "react";
import styled from "styled-components";
import { User_TYPE } from "@/types/user";
import { profileImageState } from "apollo/cache";

const ProfileSetting: FC<User_TYPE> = ({
  id,
  image,
  nickname,
  introduction,
}) => {
  useEffect(() => {
    if (image) {
      profileImageState(image);
    }
  }, [image]);
  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderText>프로필 설정</HeaderText>
      </HeaderContainer>
      <SettingImage userId={id} />
      <SettingNickName userId={id} nickname={nickname} />
      <SettingIntroduction userId={id} introduction={introduction} />
    </MainContainer>
  );
};

export default ProfileSetting;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 53px 30px 0px 30px;
`;

const HeaderContainer = styled.div`
  padding-top: 40px;
`;

const HeaderText = styled.h1`
  padding-bottom: 20px;
  border-bottom: 2px solid var(--color-border-base);
  font-size: var(--font-size-3);
`;
