import { FC } from "react";
import NotFound from "@/components/pages/404";
import Head from "next/head";

const NotFoundPage: FC = () => {
  return (
    <>
      <Head>
        <title>404 Not Found - 약정</title>
        <meta name="description" content="약을 찾아주는 요정" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
