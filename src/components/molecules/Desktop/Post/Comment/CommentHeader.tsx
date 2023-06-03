import { customTime } from "@/utils/func/common";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  createdAt: number;
  nickname: string;
}

const CommentHeader: FC<Props> = ({ nickname, createdAt }) => {
  return (
    <MainContainer>
      <NicknameContainer>
        <Link href={`/profile/${nickname}`}>{nickname}</Link>
      </NicknameContainer>
      <DateContainer>{customTime(createdAt)}</DateContainer>
    </MainContainer>
  );
};

export default CommentHeader;

const MainContainer = styled.div`
  display: flex;
`;

const NicknameContainer = styled.p`
  color: var(--color-font-radius-color);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-8);
  margin: 15px 0px 0px 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const DateContainer = styled.span`
  color: #9e9e9e;
  margin: 15px 0px 0px 15px;
  font-size: var(--font-size-9);
`;
