import ApolloError from "@/components/atoms/ApolloError";
import Loading from "@/components/atoms/Loading";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { SearchTabProps } from "@/types/apollo/search";
import { POST_TYPE } from "@/types/post";
import { SESSIONTYPE } from "@/types/session";
import { useQuery } from "@apollo/client";
import { GetSearchPost } from "apollo/querys/search";
import { FC } from "react";
import styled from "styled-components";
import PostMainList from "../Post/Main/PostMainList";
interface Props extends SearchTabProps {
  session: SESSIONTYPE | null;
}

const SearchPost: FC<Props> = ({ keyword, sort, session }) => {
  const { loading, error, data, fetchMore, refetch } = useQuery(GetSearchPost, {
    variables: {
      keyword,
      userId: session ? session.id : null,
      limit: 1,
      sort: "createdAt",
    },
  });
  const handlerFetchMore = () => {
    if (data && pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          limit: 4,
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
        title="검색 글 불러오기 실패"
        body="새로고침을 시도하시거나 잠시후 시도하여주십시요."
      />
    );

  const { posts, pageInfo } = data.getSearchPost;
  console.info(posts);
  return (
    <MainContainer>
      {posts.length > 0 ? (
        <PostCotainer>
          {posts.map((el: POST_TYPE) => {
            return <PostMainList key={el.id} posts={el} session={session} />;
          })}
        </PostCotainer>
      ) : (
        <>검색결과없음</>
      )}
      {pageInfo.hasNextPage && (
        <LoadingContainer ref={setRef}>
          <Loading
            width={40}
            height={40}
            strokeWidth={10}
            top={0}
            bottom={0}
            right={0}
            left={0}
          />
        </LoadingContainer>
      )}
    </MainContainer>
  );
};

export default SearchPost;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0px;
`;

const PostCotainer = styled.ul`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
  height: 100%;
  max-width: 1024px;
`;
