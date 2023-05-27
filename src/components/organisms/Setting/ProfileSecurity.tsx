import SettingDeleteUser from "@/components/molecules/Desktop/Setting/Security/SettingDeleteUser";
import SettingPassword from "@/components/molecules/Desktop/Setting/Security/SettingPassword";
import { User_TYPE } from "@/types/user";
import { FC } from "react";
import styled from "styled-components";

const ProfileSecurity: FC<User_TYPE> = ({
  id,
  image,
  nickname,
  introduction,
  type,
}) => {
  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderText>보안</HeaderText>
        <SettingPassword id={id} type={type} />
        <SettingDeleteUser id={id} />
      </HeaderContainer>
    </MainContainer>
  );
};

export default ProfileSecurity;

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
  user-select: none;
`;
