import { FC } from "react";
import styled from "styled-components";
import PostHeaderUser from "./PostHeaderUser";
import { User_TYPE } from "@/types/user";
import Link from "next/link";
import PostView from "@/components/atoms/post/PostView";
import PostListDate from "./List/PostListDate";
import ReEditToolBar from "./Toolbar/ReEditToolBar";
import DeleteToolBar from "./Toolbar/DeleteToolBar";

interface Props {
  id: string;
  title: string;
  user: User_TYPE;
  views: number;
  thumbnail: string | null;
  createdAt: number;
  userId: string | null;
}

const PostHeader: FC<Props> = ({
  id,
  title,
  user,
  views,
  thumbnail,
  createdAt,
  userId,
}) => {
  return (
    <MainContainer>
      <Title>{title}</Title>
      <SecondContainer>
        <UserContainer>
          <Link href={`/profile/${user.nickname}`}>
            <PostHeaderUser {...user} />
          </Link>
        </UserContainer>
        <PostView views={views} />
        <DateContainer>
          <PostListDate createdAt={createdAt} />
        </DateContainer>
      </SecondContainer>
      {userId === user.id && (
        <SessionToolBar>
          <ReEditToolBar />
          <DeleteToolBar
            postId={id}
            userId={userId}
            postUserId={user.id}
            thumbnail={thumbnail}
          />
        </SessionToolBar>
      )}
    </MainContainer>
  );
};

export default PostHeader;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  width: 100%;
  margin-bottom: 25px;
  display: -webkit-box;
  letter-spacing: -0.006em;
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-bold);
  margin-top: 10px;
  padding-left: 10px;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SecondContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SessionToolBar = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  gap: 10px;
`;
