import useSWR from "swr";
import { GetServerSideProps } from "next";
import { FC } from "react";
import Title from "@/components/atoms/Title";
import Loading from "@/components/atoms/Loading";
import styled from "styled-components";
import Course from "@/components/organisms/Google/Course";

interface Props {
  id: string;
  access_token: string;
  refresh_token: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GoogleCourse: FC<Props> = ({ id, access_token, refresh_token }) => {
  const { data, error, isLoading } = useSWR(
    `/api/v1/google/course?id=${id}&access_token=${access_token}&refresh_token=${refresh_token}`,
    fetcher
  );
  if (isLoading)
    return (
      <Container>
        <ClassContainer>
          <Loading
            width={50}
            height={50}
            strokeWidth={10}
            top={0}
            bottom={0}
            right={0}
            left={45}
          />
        </ClassContainer>
      </Container>
    );
  if (data.course)
    return (
      <Container>
        <Title title={`클래스룸 ${id} - 약정`} content={"약을 찾아주는 요정"} />
        <Course data={data.course} />
      </Container>
    );
  return (
    <Container>
      <Title title={`클래스룸 ${id} - 약정`} content={"약을 찾아주는 요정"} />
      <ClassContainer>해당하는 코스가 없습니다.</ClassContainer>
    </Container>
  );
};

export default GoogleCourse;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const access_token = context.query.access_token as string;
  const refresh_token = context.query.refresh_token as string;
  const id = context.query.id as string;
  if (access_token && refresh_token && id) {
    return {
      props: {
        id,
        access_token,
        refresh_token,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
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

const Content = styled.div`
  padding: 6px;
  font-weight: var(--font-weight-semibold);
`;
