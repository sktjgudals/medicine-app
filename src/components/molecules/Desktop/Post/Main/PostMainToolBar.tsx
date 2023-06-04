import React, { FC } from "react";
import styled from "styled-components";
import HeartToolBar from "../Toolbar/HeartToolBar";
import PostViewToolBar from "./PostViewToolBar";
import { User_TYPE } from "@/types/user";
import PostUserToolBar from "./PostUserToolBar";
import PostListDate from "../List/PostListDate";

interface Props {
  isLike: boolean;
  likeCount: number;
  userId: string | null;
  postId: string;
  user: User_TYPE;
  createdAt: number;
  views: number;
}

const PostMainToolBar: FC<Props> = ({
  postId,
  userId,
  isLike,
  likeCount,
  user,
  createdAt,
  views,
}) => {
  return (
    <MainContainer>
      <FirstContainer>
        <HeartToolBar
          postId={postId}
          isLike={isLike}
          likeCount={likeCount}
          userId={userId}
        />
        <PostViewToolBar views={views} />
      </FirstContainer>
      <SecondContainer>
        <PostUserToolBar user={user} />
        <PostListDate createdAt={createdAt} />
      </SecondContainer>
    </MainContainer>
  );
};

export default PostMainToolBar;

const MainContainer = styled.div`
  display: flex;
`;

const FirstContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const SecondContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
`;
