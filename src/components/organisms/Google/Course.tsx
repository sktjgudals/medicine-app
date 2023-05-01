import useInput from "@/hooks/useInput";
import { ClassRoomProps } from "@/types/google";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import styled from "styled-components";

interface Props {
  data: ClassRoomProps;
}

const Course: FC<Props> = ({ data }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [course, setCourse] = useState<ClassRoomProps>(data);
  const [name, setName] = useState(course.name);
  const [announcement, setAnnouncement] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const changeHandler = (type: string) => {
    if (type === "name") {
      fetch(
        `/api/v1/google/courseName?id=${router.query.id}&access_token=${router.query.access_token}&refresh_token=${router.query.refresh_token}`,
        {
          method: "POST",
          body: name,
        }
      );
      setCourse({ ...course, name: name });
      setEdit(!edit);
    }
  };
  const announcementHandler = () => {
    fetch(
      `/api/v1/google/announcement?id=${router.query.id}&access_token=${router.query.access_token}&refresh_token=${router.query.refresh_token}`,
      {
        method: "POST",
        body: announcement,
      }
    );
  };

  const courseWorkHandler = () => {
    fetch(
      `/api/v1/google/courseWork?id=${router.query.id}&access_token=${router.query.access_token}&refresh_token=${router.query.refresh_token}`,
      {
        method: "POST",
        body: JSON.stringify({ title: title, description: desc }),
      }
    );
  };
  return (
    <ClassContainer>
      <EditorButton onClick={() => setEdit(!edit)}>수정하기</EditorButton>
      {edit ? (
        <>
          <Content>
            수업이름:
            <input
              type="text"
              placeholder={`${course.name}`}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button onClick={() => changeHandler("name")}>변경하기</button>
            <Content>
              공지사항 만들기:
              <input
                type="text"
                placeholder={`공지사항을 입력해주세요`}
                onChange={(e) => setAnnouncement(e.target.value)}
                value={announcement}
              />
              <button onClick={() => announcementHandler()}>
                공지사항 설정
              </button>
            </Content>
          </Content>
          <Content>
            강의과제 만들기:
            <p>
              과제 제목:
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </p>
            <p>
              과제 본문:
              <input
                type="textarea"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </p>
            <button onClick={() => courseWorkHandler()}>과제 만들기</button>
          </Content>
        </>
      ) : (
        <>
          <Content>수업 이름:{course.name}</Content>
          <Content>섹션: {course.section}</Content>
          <Content>선생님 그룹 이메일: {course.teacherGroupEmail}</Content>
          <Content>코스 상태: {course.courseState}</Content>
          <Content>캘린더 아이디: {course.calendarId}</Content>
          <Content>오너 아이디: {course.ownerId}</Content>
          <Content>링크: {course.alternateLink}</Content>
          <Content>수업 그룹 이메일: {course.courseGroupEmail}</Content>
        </>
      )}
    </ClassContainer>
  );
};

export default Course;

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

const Content = styled.div`
  padding: 10px;
  font-weight: var(--font-weight-semibold);
`;

const EditorButton = styled.button``;
