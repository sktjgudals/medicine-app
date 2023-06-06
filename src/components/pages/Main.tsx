import { POST_TYPE } from "@/types/post";
import { SESSIONTYPE } from "@/types/session";
import { useQuery } from "@apollo/client";
import { PostGetList } from "apollo/querys/post";
import { FC } from "react";
import styled from "styled-components";
import PostMainList from "../molecules/Desktop/Post/Main/PostMainList";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Loading from "../atoms/Loading";
import ApolloError from "../atoms/ApolloError";
import SKPostList from "../atoms/Skeleton/SKPostList";

interface Props {
  session: SESSIONTYPE | null;
}

const Main: FC<Props> = ({ session }) => {
  const { loading, data, error, fetchMore, refetch } = useQuery(PostGetList, {
    variables: {
      userId: session ? session.id : null,
      limit: 20,
      sort: "new",
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

  if (loading)
    return (
      <>
        <SKPostList />;
      </>
    );
  if (error)
    return (
      <div onClick={() => refetch()}>
        <ApolloError
          title="글 불러오기 오류"
          body="새로고침을 시도해주시거나 여기를 다시 클릭해주세요."
        />
      </div>
    );

  const { posts, pageInfo } = data.postGetList;
  return (
    <MainContainer>
      <MainContentContainer>
        {posts.length > 0 ? (
          <PostCotainer>
            {posts.map((el: POST_TYPE) => {
              return <PostMainList key={el.id} posts={el} session={session} />;
            })}
          </PostCotainer>
        ) : (
          <div onClick={() => refetch()}>
            <ApolloError
              title="글 불러오기 오류"
              body="새로고침을 시도해주시거나 여기를 다시 클릭해주세요."
            />
          </div>
        )}
      </MainContentContainer>
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

export default Main;

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

const MainContentContainer = styled.main`
  display: flex;
  justify-content: center;
`;
