import { FC } from "react";
import styled from "styled-components";

import { POST_TYPE } from "@/types/post";
import { SESSIONTYPE } from "@/types/session";

import ProfilePost from "@/components/molecules/Desktop/Profile/ProfilePost";
import { User_TYPE } from "@/types/user";

interface Props {
  posts: [POST_TYPE];
  session: SESSIONTYPE | null;
  user: User_TYPE;
  cb: () => void;
}

const ProfilePostInfo: FC<Props> = ({ posts, session, user, cb }) => {
  return (
    <MainContainer>
      <PostCotainer>
        {posts.length > 0 ? (
          <PostListContainer>
            {posts.map((el: POST_TYPE) => (
              <ProfilePost key={el.id} {...el} user={user} />
            ))}
          </PostListContainer>
        ) : (
          "작성한 게시글이 없습니다."
        )}
      </PostCotainer>
      <ButtonContainer onClick={cb}>더보기</ButtonContainer>
    </MainContainer>
  );
};

export default ProfilePostInfo;

const MainContainer = styled.div`
  width: 100%;
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
  max-width: 1000px;
`;

const PostListContainer = styled.ul``;

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
