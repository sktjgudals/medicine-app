import { FC } from "react";
import { useQuery } from "@apollo/client";

import ApolloError from "@/components/atoms/ApolloError";
import { SearchTabProps } from "@/types/apollo/search";
import { GetSearchUser } from "apollo/querys/search";

const SearchUser: FC<SearchTabProps> = ({ keyword, sort }) => {
  const { loading, error, data } = useQuery(GetSearchUser, {
    variables: {
      keyword,
      limit: 20,
      sort: "createdAt",
    },
  });
  if (loading) return <></>;
  if (error)
    return (
      <ApolloError
        title="검색한 유저 불러오기 실패"
        body="새로고침을 시도하시거나 잠시후 시도하여주십시요."
      />
    );
  console.info(data);
  return <div></div>;
};

export default SearchUser;
