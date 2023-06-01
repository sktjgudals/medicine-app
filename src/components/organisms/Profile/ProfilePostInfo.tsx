import { FC } from "react";
import styled from "styled-components";

import { POST_PAGE_INFO, POST_TYPE } from "@/types/post";
import { SESSIONTYPE } from "@/types/session";

import ProfilePost from "@/components/molecules/Desktop/Profile/ProfilePost";
import { User_TYPE } from "@/types/user";

interface Props {
  posts: [POST_TYPE];
  session: SESSIONTYPE | null;
  user: User_TYPE;
  cb: () => void;
  pageInfo: POST_PAGE_INFO;
}

const ProfilePostInfo: FC<Props> = ({ posts, session, user, cb, pageInfo }) => {
  return (
    <MainContainer>
      <TextContainer>
        <TextContent>사용자가 작성한 글</TextContent>
      </TextContainer>
      <PostCotainer>
        {posts.length > 0 ? (
          <PostListContainer>
            {posts.map((el: POST_TYPE) => (
              <ProfilePost key={el.id} {...el} user={user} />
            ))}
          </PostListContainer>
        ) : (
          <PostEmptyContainer>작성한 게시글이 없습니다.</PostEmptyContainer>
        )}
      </PostCotainer>
      {pageInfo.hasNextPage && (
        <ButtonContainer onClick={cb}>더보기</ButtonContainer>
      )}
    </MainContainer>
  );
};

export default ProfilePostInfo;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
  margin-bottom: 50px;
`;

const PostCotainer = styled.div`
  border-radius: 10px;
  background: var(--color-modal-default-background);
  padding: 5px;
  width: 100%;
  height: 100%;
  max-width: 1000px;
`;

const PostListContainer = styled.ul`
  height: 100%;
`;

const PostEmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: var(--font-size-6);
`;

const ButtonContainer = styled.button`
  cursor: pointer;
  background-color: var(--color-background-radius-button);
  color: var(--color-font-radius-button);
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 20px;
  position: relative;
  width: 100%;
  max-width: 300px;
  padding: 7px 11px;
  margin-top: 20px;
  flex-direction: row-reverse;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 36px;
  border-radius: 18px;
`;

const TextContainer = styled.div`
  padding: 20px;
`;

const TextContent = styled.h2`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: var(--font-size-5);
  font-weight: var(--font-weight-bold);
  user-select: none;
`;
