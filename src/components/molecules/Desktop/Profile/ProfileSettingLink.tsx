import SettingIcon from "@/components/atoms/icons/SettingIcon";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  sessionId: string;
  userId: string;
}

const ProfileSettingLink: FC<Props> = ({ sessionId, userId }) => {
  if (sessionId === userId) {
    return (
      <MainContainer>
        <Link href="/setting/profile">
          <SettingsContainer>
            <SettingIcon width={"15px"} height={"15px"} />
            설정
          </SettingsContainer>
        </Link>
      </MainContainer>
    );
  }
  return <></>;
};

export default ProfileSettingLink;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SettingsContainer = styled.div`
  background: var(--color-default-background);
  width: 100px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 5px;
  text-align: center;
`;
