import { gql, useQuery } from "@apollo/client";
import Main from "@/components/pages/Main";
import Title from "@/components/atoms/Title";
import Portal from "@/components/atoms/Portal";

const GET_TEST = gql`
  query hello {
    hello
    a
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_TEST);
  if (loading) return;
  if (error) return;
  console.info(data);
  return (
    <>
      <Title title={"약정"} content={"약을 찾아주는 요정"} />
      <Main />
    </>
  );
}
