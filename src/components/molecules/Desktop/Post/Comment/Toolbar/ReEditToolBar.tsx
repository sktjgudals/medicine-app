import {
  ToolBarButtonContainer,
  ToolBarContainer,
} from "@/components/atoms/ToolBar";
import PenIcon from "@/components/atoms/icons/PenIcon";
import { commentEditMode } from "apollo/cache";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  commentId: string;
}

const ReEditToolBar: FC<Props> = ({ commentId }) => {
  const editHandler = () => {
    commentEditMode(commentId);
  };
  return (
    <ToolBarContainer>
      <ToolBarButtonContainer onClick={editHandler}>
        <IconContainer>
          <PenIcon />
        </IconContainer>
        수정
      </ToolBarButtonContainer>
    </ToolBarContainer>
  );
};

export default ReEditToolBar;

const IconContainer = styled.div`
  width: 20px;
  height: 20px;
`;
