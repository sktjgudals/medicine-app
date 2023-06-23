import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { POST_TYPE } from "@/types/post";

import PostHeaderUser from "../Post/PostHeaderUser";
import PostListTitle from "../Post/List/PostListTitle";
import PostListDate from "../Post/List/PostListDate";
import PostListView from "../Post/List/PostListView";

import PostMainThumbnail from "../Post/Main/PostMainThumbnail";

const ProfilePost: FC<POST_TYPE> = ({
  id,
  createdAt,
  title,
  views,
  num,
  user,
  thumbnail,
}) => {
  return (
    <Link href={`/post/${num}`}>
      <MainContainer>
        <FirstRowContainer>
          <PostListView views={views} />
          <PostMainThumbnail
            thumbnail={thumbnail}
            width={220}
            height={120}
            responsiveWidth={150}
            responsiveHeight={90}
          />
          <PostListTitle
            title={title}
            height={110}
            fontSize={5}
            lineClamp={5}
            paddingTop={0}
          />
        </FirstRowContainer>
        <LastRowContainer>
          <UserContainer>
            <PostHeaderUser {...user} />
          </UserContainer>
          <DateContainer>
            <PostListDate createdAt={createdAt} />
          </DateContainer>
        </LastRowContainer>
      </MainContainer>
    </Link>
  );
};

export default ProfilePost;

const MainContainer = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--color-hinted-grey-9);
  padding: 30px;
`;

const LastRowContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const FirstRowContainer = styled.div`
  width: 100%;
  display: flex;
`;

const DateContainer = styled.div`
  width: 90px;
  @media screen and (max-width: 490px) {
    display: none;
  }
`;
