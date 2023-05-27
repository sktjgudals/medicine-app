import ApolloError from "@/components/atoms/ApolloError";
import Title from "@/components/atoms/Title";
import ProfileNav from "@/components/organisms/Setting/ProfileNav";
import ProfileSecurity from "@/components/organisms/Setting/ProfileSecurity";
import { SESSIONTYPE } from "@/types/session";
import { useQuery } from "@apollo/client";
import { GetUserData } from "apollo/querys/setting";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  session: SESSIONTYPE;
}

const SecurityPage: FC<Props> = ({ session }) => {
  const { loading, data, error, refetch } = useQuery(GetUserData, {
    variables: { userId: session.id },
  });
  if (loading) return <></>;
  if (error || !data.getUserData)
    return (
      <div onClick={() => refetch()}>
        <Title title={`오류 - 약정`} content={"약을 찾아주는 요정"} />
        <ApolloError
          title={"사용자 정보를 불러오는데 실패하였습니다."}
          body={"새로고침을 하시거나 여기를 클릭하여주세요."}
        />
      </div>
    );
  return (
    <MainContainer>
      <ProfileNav />
      <ProfileSecurity />
    </MainContainer>
  );
};

export default SecurityPage;

const MainContainer = styled.div`
  display: flex;
`;
