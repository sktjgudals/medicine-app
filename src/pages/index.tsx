import { useQuery } from "@apollo/client";

import Main from "@/components/pages/Main";
import Title from "@/components/atoms/Title";
import { useSession } from "@/hooks/useSession";

const Home = () => {
  const { session, loading } = useSession();
  if (loading) return <></>;

  return (
    <>
      <Title title={"약정"} content={"약을 찾아주는 요정"} />
      <Main session={session} />
    </>
  );
};

export default Home;
