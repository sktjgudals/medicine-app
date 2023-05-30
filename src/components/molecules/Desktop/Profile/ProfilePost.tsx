import { POST_TYPE } from "@/types/post";
import { FC } from "react";
import styled from "styled-components";

const ProfilePost: FC<POST_TYPE> = ({
  id,
  createdAt,
  title,
  views,
  likeCount,
  user,
}) => {
  console.info(user);
  return <MainContainer>{id}</MainContainer>;
};

export default ProfilePost;

const MainContainer = styled.li``;
