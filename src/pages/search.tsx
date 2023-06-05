import { FC } from "react";
import { GetServerSideProps } from "next";

import Title from "@/components/atoms/Title";
import SearchTab from "@/components/organisms/Common/Tab/SearchTab";
import NotFoundPage from "./404";
import { QueryProps } from "@/types/apollo/search";

const search: FC<QueryProps> = (query) => {
  if (query["keyword"]) {
    return (
      <>
        <Title title={"검색 - 약정"} content={"검색결과: 약을 찾아주는 요정"} />
        <SearchTab query={query} />
      </>
    );
  }
  return <NotFoundPage />;
};

export default search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { ...context.query } };
};
