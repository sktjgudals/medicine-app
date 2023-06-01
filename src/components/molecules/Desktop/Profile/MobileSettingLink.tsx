import SettingIcon from "@/components/atoms/icons/SettingIcon";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  sessionId: string;
  userId: string;
}

const MobileSettingLink: FC<Props> = ({ sessionId, userId }) => {
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
  } else {
    return <></>;
  }
};

export default MobileSettingLink;

const MainContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 10px;
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

const SettingsContainer = styled.div`
  background: var(--color-background-radius-button);
  height: 60px;
  width: 200px;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  gap: 5px;
`;
