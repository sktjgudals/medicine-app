import { FC } from "react";

import { useQuery } from "@apollo/client";
import { GetSearchPost } from "apollo/querys/search";

import ApolloError from "@/components/atoms/ApolloError";
import Loading from "@/components/atoms/Loading";
import {
  SearchLoadingContainer,
  SearchMainContainer,
  SearchNotFoundContainer,
  SearchPostCotainer,
} from "@/components/atoms/Search";
import PostMainList from "../Post/Main/PostMainList";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import { SearchTabProps } from "@/types/apollo/search";
import { POST_TYPE } from "@/types/post";
import { SESSIONTYPE } from "@/types/session";
import SKPostList from "@/components/atoms/Skeleton/SKPostList";

interface Props extends SearchTabProps {
  session: SESSIONTYPE | null;
}

const SearchPost: FC<Props> = ({ keyword, sort, session }) => {
  const { loading, error, data, fetchMore, refetch } = useQuery(GetSearchPost, {
    variables: {
      keyword,
      userId: session ? session.id : null,
      limit: 10,
      sort: sort,
    },
  });
  const handlerFetchMore = () => {
    if (data && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          limit: 20,
          cursor: posts[posts.length - 1].id,
        },
      });
    }
  };

  const [ref, setRef] = useInfiniteScroll(handlerFetchMore);
  if (loading) return <SKPostList />;
  if (error)
    return (
      <ApolloError
        title="검색 글 불러오기 실패"
        body="새로고침을 시도하시거나 잠시후 시도하여주십시요."
      />
    );

  const { posts, pageInfo } = data.getSearchPost;

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

export default SearchPost;
