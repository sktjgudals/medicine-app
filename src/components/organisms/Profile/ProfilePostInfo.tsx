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
}

const ProfilePostInfo: FC<Props> = ({ posts, session, user }) => {
  return (
    <MainContainer>
      <PostCotainer>
        {posts.length > 0 ? (
          <ul>
            {posts.map((el: POST_TYPE) => (
              <ProfilePost key={el.id} {...el} />
            ))}
          </ul>
        ) : (
          "없음"
        )}
      </PostCotainer>
    </MainContainer>
  );
};

export default ProfilePostInfo;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
  margin-bottom: 50px;
`;

const PostCotainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  margin: 8px;
  background: var(--color-modal-default-background);
  border-radius: 20px;
`;
