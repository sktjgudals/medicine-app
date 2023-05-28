import { FC } from "react";
import styled from "styled-components";

interface Props {
  nickname: string;
}

const ProfileUserNickname: FC<Props> = ({ nickname }) => {
  return <MainContainer>{nickname}</MainContainer>;
};

export default ProfileUserNickname;

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 30px;
`;
