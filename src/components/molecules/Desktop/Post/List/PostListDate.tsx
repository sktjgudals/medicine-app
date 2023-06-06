import { customTime } from "@/utils/func/common";
import { FC } from "react";
import styled from "styled-components";

const PostListDate: FC<{ createdAt: number }> = ({ createdAt }) => {
  return <MainContainer>{customTime(createdAt)}</MainContainer>;
};

export default PostListDate;

const MainContainer = styled.div`
  display: flex;
  white-space: pre-wrap;
  @media screen and (max-width: 400px) {
    display: none;
  }
`;
