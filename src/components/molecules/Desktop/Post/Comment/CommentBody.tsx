import { FC } from "react";
import styled from "styled-components";
import DOMPurify from "dompurify";

interface Props {
  body: string;
  length: number;
}

const CommentBody: FC<Props> = ({ body, length }) => {
  console.info(length);
  return (
    <MainContainer>
      <BodyContent
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
      />
    </MainContainer>
  );
};

export default CommentBody;

const MainContainer = styled.div`
  display: flex;
  margin: 10px 0px 0px 15px;
  overflow: hidden;
`;

const BodyContent = styled.span`
  // font-size: var;
`;
