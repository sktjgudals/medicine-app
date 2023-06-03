import { dateFunc } from "@/utils/func/common";
import { FC, useMemo } from "react";
import styled from "styled-components";

interface Props {
  introduction?: string | null;
  createdAt: number;
}

const ProfileUserIntro: FC<Props> = ({ introduction, createdAt }) => {
  const date = useMemo(() => dateFunc(createdAt), [createdAt]);

  return (
    <MainContainer>
      <IntroductionContainer>
        {introduction ? introduction : "한줄 소개가 없습니다."}
      </IntroductionContainer>
      <IntroDateContainer>생성일: {date}</IntroDateContainer>
    </MainContainer>
  );
};

export default ProfileUserIntro;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IntroductionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 60px;
`;

const IntroDateContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;
