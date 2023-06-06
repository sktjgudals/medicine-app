import { FC } from "react";
import { useQuery } from "@apollo/client";

import ApolloError from "@/components/atoms/ApolloError";
import { SearchTabProps } from "@/types/apollo/search";
import { GetSearchUser } from "apollo/querys/search";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import {
  SearchLoadingContainer,
  SearchMainContainer,
  SearchNotFoundContainer,
  SearchPostCotainer,
} from "@/components/atoms/Search";
import Loading from "@/components/atoms/Loading";
import { User_TYPE } from "@/types/user";
import UserContent from "../User/UserContent";

const SearchUser: FC<SearchTabProps> = ({ keyword, sort }) => {
  const { loading, error, data, fetchMore } = useQuery(GetSearchUser, {
    variables: {
      keyword,
      limit: 1,
      sort: sort,
    },
  });
  const handlerFetchMore = () => {
    if (data && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          limit: 1,
          cursor: users[users.length - 1].id,
        },
      });
    }
  };

  const [ref, setRef] = useInfiniteScroll(handlerFetchMore);
  if (loading) return <></>;
  if (error)
    return (
      <ApolloError
        title="검색한 유저 불러오기 실패"
        body="새로고침을 시도하시거나 잠시후 시도하여주십시요."
      />
    );
  const { users, pageInfo } = data.getSearchUser;
  console.info(users);
  return (
    <SearchMainContainer>
      {users.length > 0 ? (
        <SearchPostCotainer>
          {users.map((el: User_TYPE) => {
            return <UserContent key={el.id} user={el} />;
          })}
        </SearchPostCotainer>
      ) : (
        <SearchNotFoundContainer>
          검색 결과가 발견되지 않았습니다.
        </SearchNotFoundContainer>
      )}
      {pageInfo.hasNextPage && (
        <SearchLoadingContainer ref={setRef}>
          <Loading
            width={40}
            height={40}
            strokeWidth={10}
            top={0}
            bottom={0}
            right={0}
            left={0}
          />
        </SearchLoadingContainer>
      )}
    </SearchMainContainer>
  );
};

export default SearchUser;
