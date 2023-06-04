import { POST_TYPE } from "@/types/post";
import { SESSIONTYPE } from "@/types/session";
import { useQuery } from "@apollo/client";
import { PostGetList } from "apollo/querys/post";
import { FC } from "react";
import styled from "styled-components";
import PostMainList from "../molecules/Desktop/Post/Main/PostMainList";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Loading from "../atoms/Loading";

interface Props {
  session: SESSIONTYPE | null;
}

const Main: FC<Props> = ({ session }) => {
  const { loading, data, error, fetchMore } = useQuery(PostGetList, {
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

  if (loading) return <></>;
  if (error) return <>error</>;

  const { posts, pageInfo } = data.postGetList;

  return (
    <MainContainer>
      {posts.length > 0 ? (
        <ul>
          {posts.map((el: POST_TYPE) => {
            return <PostMainList key={el.id} {...el} />;
          })}
        </ul>
      ) : (
        <></>
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

export default Main;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  max-width: 1024px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justifycontent: center;
  padding: 20px 0px;
`;
