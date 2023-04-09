import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
  content: string;
}

const Title: FC<Props> = ({ title, content }) => {
  // 약을 찾아주는 요정
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Title;
