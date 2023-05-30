import { POST_TYPE } from "@/types/post";
import { FC } from "react";
import styled from "styled-components";
import PostHeaderUser from "../Post/PostHeaderUser";
import PostListTitle from "../Post/List/PostListTitle";
import PostListDate from "../Post/List/PostListDate";
import PostListView from "../Post/List/PostListView";
import Link from "next/link";

const ProfilePost: FC<POST_TYPE> = ({
  id,
  createdAt,
  title,
  views,
  likeCount,
  num,
  user,
}) => {
  return (
    <Link href={`/post/${num}`}>
      <MainContainer>
        <FirstRawContainer>
          <PostListView views={views} />
          <PostListTitle title={title} />
        </FirstRawContainer>
        <LastRawContainer>
          <UserContainer>
            <PostHeaderUser {...user} />
          </UserContainer>
          <PostListDate createdAt={createdAt} />
        </LastRawContainer>
      </MainContainer>
    </Link>
  );
};

export default ProfilePost;

const MainContainer = styled.li`
  display: flex;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--color-hinted-grey-9);
  padding: 30px;
`;

const LastRawContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
`;

const FirstRawContainer = styled.div`
  width: 100%;
  display: flex;
`;