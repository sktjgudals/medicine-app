import ApolloError from "@/components/atoms/ApolloError";
import { SearchTabProps } from "@/types/apollo/search";
import { SESSIONTYPE } from "@/types/session";
import { useQuery } from "@apollo/client";
import { GetSearchPost } from "apollo/querys/search";
import { FC } from "react";
interface Props extends SearchTabProps {
  session: SESSIONTYPE | null;
}

const SearchPost: FC<Props> = ({ keyword, sort, session }) => {
  const { loading, error, data } = useQuery(GetSearchPost, {
    variables: {
      keyword,
      userId: session ? session.id : null,
      limit: 20,
      sort: "createdAt",
    },
  });
  if (loading) return <></>;
  if (error)
    return (
      <ApolloError
        title="검색 글 불러오기 실패"
        body="새로고침을 시도하시거나 잠시후 시도하여주십시요."
      />
    );
  console.info(data);

  return <div></div>;
};

export default SearchPost;
