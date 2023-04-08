import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import Main from "@/components/pages/Main";

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
      <Head>
        <title>약정</title>
        <meta name="description" content="약을 찾아주는 요정" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
}
