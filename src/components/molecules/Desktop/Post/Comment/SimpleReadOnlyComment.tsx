import { FC, useState } from "react";
import styled from "styled-components";
import ReadOnlyComment from "./ReadOnlyComment";
import { Button } from "@/components/atoms/Button";

const SimpleReadOnlyComment: FC<{ body: string }> = ({ body }) => {
  const [open, setOpen] = useState<boolean>(false);
  const openHandler = () => {
    setOpen(!open);
  };
  return (
    <>
      {!open ? (
        <MainContainer>
          <SimpleContainer>
            <ReadOnlyComment body={body} />
          </SimpleContainer>
          <MoreButton onClick={openHandler}>더보기</MoreButton>
        </MainContainer>
      ) : (
        <MainContainer>
          <ReadOnlyComment body={body} />
          <MoreButton onClick={openHandler}>간단하게보기</MoreButton>
        </MainContainer>
      )}
    </>
  );
};

export default SimpleReadOnlyComment;

const MoreButton = styled(Button)`
  width: 100px;
  height: 20px;
  font-size: 14px;
  line-height: 18px;
  margin-top: 6px;
  background-color: transparent;
  color: var(--color-green-12);
`;

const SimpleContainer = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;
