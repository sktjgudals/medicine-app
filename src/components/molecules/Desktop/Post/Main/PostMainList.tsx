import { FC } from "react";
import styled from "styled-components";

import { POST_TYPE } from "@/types/post";
import Link from "next/link";
import { SESSIONTYPE } from "@/types/session";
import PostMainToolBar from "./PostMainToolBar";
import PostMainThumbnail from "./PostMainThumbnail";
import PostListTitle from "../List/PostListTitle";

interface Props {
  posts: POST_TYPE;
  session: SESSIONTYPE | null;
}

const PostMainList: FC<Props> = ({ posts, session }) => {
  return (
    <MainContainer>
      <Link href={`/post/${posts.num}`}>
        <ContentContainer>
          <FirstRowContainer>
            <PostMainThumbnail
              thumbnail={posts.thumbnail}
              width={280}
              height={160}
              responsiveWidth={170}
              responsiveHeight={90}
            />
          </FirstRowContainer>
          <SecondRowContainer>
            <PostListTitle
              title={posts.title}
              height={150}
              fontSize={4}
              lineClamp={5}
              paddingTop={10}
            />
          </SecondRowContainer>
        </ContentContainer>
      </Link>
      <PostMainToolBar
        postId={posts.id}
        isLike={posts.isLike}
        likeCount={posts.likeCount}
        userId={session ? session.id : null}
        user={posts.user}
        createdAt={posts.createdAt}
        views={posts.views}
      />
    </MainContainer>
  );
};

export default PostMainList;

const MainContainer = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--color-modal-default-background);
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 5px;
`;

const FirstRowContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const SecondRowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 180px;
  width: 100%;
  border-bottom: 1px solid var(--color-opac-w-14);
`;
