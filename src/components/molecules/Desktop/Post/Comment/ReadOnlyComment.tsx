import { FC } from "react";
import DOMPurify from "dompurify";
import styled from "styled-components";

const ReadOnlyComment: FC<{ body: string }> = ({ body }) => {
  return (
    <CommentContent
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
    />
  );
};

export default ReadOnlyComment;

const CommentContent = styled.div`
  height: 100%;
  word-break: break-all;
`;
