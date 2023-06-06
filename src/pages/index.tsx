import Main from "@/components/pages/Main";
import Title from "@/components/atoms/Title";
import { useSession } from "@/hooks/useSession";
import styled from "styled-components";

const Home = () => {
  const { session, loading } = useSession();
  if (loading) return <></>;

  return (
    <MainContainer>
      <Title title={"약정"} content={"약을 찾아주는 요정"} />
      <Main session={session} />
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.main`
  padding: 56px 0px 0px 0px;
`;
