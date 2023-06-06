import { FC } from "react";
import { useQuery } from "@apollo/client";
import { GetSearchTag } from "apollo/querys/search";

import Loading from "@/components/atoms/Loading";
import ApolloError from "@/components/atoms/ApolloError";
import PostMainList from "../Post/Main/PostMainList";
import {
  SearchLoadingContainer,
  SearchMainContainer,
  SearchNotFoundContainer,
  SearchPostCotainer,
} from "@/components/atoms/Search";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import { SearchTabProps } from "@/types/apollo/search";
import { POST_TYPE } from "@/types/post";
import { SESSIONTYPE } from "@/types/session";

interface Props extends SearchTabProps {
  session: SESSIONTYPE | null;
}

const SearchTag: FC<Props> = ({ keyword, sort, session }) => {
  const { loading, error, data, fetchMore } = useQuery(GetSearchTag, {
    variables: {
      keyword,
      userId: session ? session.id : null,
      limit: 1,
      sort: sort,
    },
  });
  const handlerFetchMore = () => {
    if (data && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          limit: 1,
          cursor: posts[posts.length - 1].id,
        },
      });
    }
  };

  const [ref, setRef] = useInfiniteScroll(handlerFetchMore);

  if (loading) return <></>;
  if (error)
    return (
      <ApolloError
        title="태그된글 불러오기 실패"
        body="새로고침을 시도하시거나 잠시후 시도하여주십시요."
      />
    );

  const { posts, pageInfo } = data.getSearchTag;

  return (
    <SearchMainContainer>
      {posts.length > 0 ? (
        <SearchPostCotainer>
          {posts.map((el: POST_TYPE) => {
            return <PostMainList key={el.id} posts={el} session={session} />;
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

export default SearchTag;
