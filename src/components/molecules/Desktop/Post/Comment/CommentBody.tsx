import { FC } from "react";
import styled from "styled-components";

import SimpleReadOnlyComment from "./SimpleReadOnlyComment";
import ReadOnlyComment from "./ReadOnlyComment";

interface Props {
  body: string;
  length: number;
}

const CommentBody: FC<Props> = ({ body, length }) => {
  return (
    <MainContainer>
      {length > 3 ? (
        <SimpleReadOnlyComment body={body} />
      ) : (
        <ReadOnlyComment body={body} />
      )}
    </MainContainer>
  );
};

export default CommentBody;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px 0px 15px;
`;
