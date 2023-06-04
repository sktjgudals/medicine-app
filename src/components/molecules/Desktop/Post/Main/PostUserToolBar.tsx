import { FC } from "react";
import styled from "styled-components";
import PostHeaderUser from "../PostHeaderUser";
import { User_TYPE } from "@/types/user";
import Link from "next/link";

interface Props {
  user: User_TYPE;
}

const PostUserToolBar: FC<Props> = ({ user }) => {
  return (
    <MainContainer>
      <Link href={`/profile/${user.nickname}`}>
        <PostHeaderUser {...user} />
      </Link>
    </MainContainer>
  );
};

export default PostUserToolBar;

const MainContainer = styled.div``;
