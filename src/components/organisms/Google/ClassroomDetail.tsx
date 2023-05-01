import { FC } from "react";
import styled from "styled-components";
import { ClassRoomProps } from "@/types/google";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  token: ClassRoomProps;
}

const ClassroomDetail: FC<Props> = ({ token }) => {
  const router = useRouter();
  return (
    <MainContainer>
      <ContentsContainer>
        <Link
          href={`/google/course/${token.id}?access_token=${router.query.access_token}&refresh_token=${router.query.refresh_token}`}
        >
          <ClassContainer>
            <Content>수업이름: {token.name}</Content>
            <Content>{token.teacherGroupEmail}</Content>
            <Content>{token.courseState}</Content>
            <Content>{token.calendarId}</Content>
            <Content>섹션: {token.section}</Content>
          </ClassContainer>
        </Link>
      </ContentsContainer>
    </MainContainer>
  );
};

export default ClassroomDetail;

const Content = styled.div`
  padding: 6px;
  font-weight: var(--font-weight-semibold);
`;

const MainContainer = styled.div`
  position: relative;
`;

const ClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-modal-default-text);
  background-color: var(--color-modal-default-background);
  border-radius: 0.4rem !important;
  box-shadow: var(--shadow-elevation-1) !important;
  padding: 2rem !important;
  word-wrap: break-word;
`;

const ContentsContainer = styled.div`
  margin: 1rem 2rem 2rem !important;
`;
