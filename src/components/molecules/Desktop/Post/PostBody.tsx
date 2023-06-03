import { FC, lazy, memo } from "react";

import styled from "styled-components";

const LazyQuill = memo(lazy(() => import("./QuillLeader")));

interface Props {
  body: string;
}

const PostBody: FC<Props> = ({ body }) => {
  return (
    <MainContainer>
      <LazyQuill body={body} />
    </MainContainer>
  );
};

export default PostBody;

const MainContainer = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
`;
