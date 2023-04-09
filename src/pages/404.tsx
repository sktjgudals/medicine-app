import { FC } from "react";
import NotFound from "@/components/pages/404";
import Head from "next/head";
import Title from "@/components/atoms/Title";

const NotFoundPage: FC = () => {
  return (
    <>
      <Title
        title={"404 Not Found - 약정"}
        content={"약을 찾아주는 요정 페이지를 찾을수없습니다."}
      />
      <NotFound />
    </>
  );
};

export default NotFoundPage;
