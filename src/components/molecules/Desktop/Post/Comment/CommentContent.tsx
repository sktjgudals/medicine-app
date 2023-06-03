import { Comment_Type } from "@/types/comment";
import { FC } from "react";
import styled from "styled-components";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CircleImage from "@/components/atoms/CircleImage";
import Link from "next/link";

const CommentContent: FC<Comment_Type> = ({
  id,
  body,
  postId,
  user,
  createdAt,
  length,
}) => {
  return (
    <MainContainer>
      <ImageContainer>
        <Link href={`/profile/${user.nickname}`}>
          <CircleImage width={50} height={50} image={user.image} />
        </Link>
      </ImageContainer>
      <InfoContainer>
        <CommentHeader createdAt={createdAt} nickname={user.nickname} />
        <CommentBody body={body} length={length} />
      </InfoContainer>
    </MainContainer>
  );
};

export default CommentContent;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  margin: 10px auto;
  background: var(--color-background-radius-button);
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  float: left;
  margin: 0px 0px 0px 20px;
  border-radius: 300px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
