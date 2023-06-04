import { FC } from "react";
import styled from "styled-components";

import { POST_TYPE } from "@/types/post";

const PostMainList: FC<POST_TYPE> = ({ id, title }) => {
  return <MainContainer>{id}</MainContainer>;
};

export default PostMainList;

const MainContainer = styled.li``;
