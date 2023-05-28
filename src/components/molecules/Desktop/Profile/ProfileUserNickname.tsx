import { FC } from "react";
import styled from "styled-components";

interface Props {
  nickname: string;
}

const ProfileUserNickname: FC<Props> = ({ nickname }) => {
  return (
    <MainContainer>
      <NicknameContent>{nickname}</NicknameContent>
    </MainContainer>
  );
};

export default ProfileUserNickname;

const MainContainer = styled.div`
  display: flex;
  height: 30px;
`;

const NicknameContent = styled.h2`
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-bold);
`;
