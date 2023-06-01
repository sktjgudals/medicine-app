import { FC } from "react";
import styled from "styled-components";
import PostHeaderUser from "./PostHeaderUser";
import { User_TYPE } from "@/types/user";
import Link from "next/link";

interface Props {
  title: string;
  user: User_TYPE;
}

const PostHeader: FC<Props> = ({ title, user }) => {
  return (
    <MainContainer>
      <Title>{title}</Title>
      <Link href={`/profile/${user.nickname}`}>
        <PostHeaderUser {...user} />
      </Link>
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
