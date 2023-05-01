import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "@/components/atoms/Title";
import { GetServerSideProps } from "next";
import { oauth2Client } from "@/utils/func/oauth";
import { google } from "googleapis";
import { ClassRoomProps } from "@/types/google";
import ClassroomDetail from "@/components/organisms/Google/ClassroomDetail";

interface Props {
  classRoom?: [ClassRoomProps];
  error: boolean;
}

const Classrooms: FC<Props> = ({ classRoom, error }) => {
  if (error) {
    return (
      <Container>
        <Title title={"구글 클래스룸 - 약정"} content={"약을 찾아주는 요정"} />
        에러 발생하였습니다 처음부터 다시 시도해주십시요.
      </Container>
    );
  }
  if (classRoom === null) {
    <Container>
      <Title title={"구글 클래스룸 - 약정"} content={"약을 찾아주는 요정"} />
    </Container>;
  }
  return (
    <Container>
      <Title title={"구글 클래스룸 - 약정"} content={"약을 찾아주는 요정"} />
      {classRoom &&
        classRoom.map((el: ClassRoomProps) => {
          return <ClassroomDetail key={el.id} token={el} />;
        })}
    </Container>
  );
};

export default Classrooms;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const access_token = context.query.access_token as string;
    const refresh_token = context.query.refresh_token as string;
    if (access_token && refresh_token) {
      let google_token = {
        access_token,
        refresh_token,
        token_type: "Bearer",
      };
      oauth2Client.setCredentials(google_token);
      const classroom = google.classroom({
        version: "v1",
        auth: oauth2Client,
      });
      const res = await classroom.courses.list({
        pageSize: 10,
      });
      if (res.data.courses) {
        return {
          props: { classRoom: res.data.courses, error: false },
        };
      } else {
        return {
          props: { classRoom: null, error: false },
        };
      }
    } else {
      return { props: { error: true } };
    }
  } catch (e) {
    return {
      props: { error: true },
    };
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;
