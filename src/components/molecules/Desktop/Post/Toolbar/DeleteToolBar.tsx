import {
  ToolBarButtonContainer,
  ToolBarContainer,
} from "@/components/atoms/ToolBar";
import TrashCanIcon from "@/components/atoms/icons/TrashCanIcon";
import { FC } from "react";
import styled from "styled-components";

const DeleteToolBar: FC = () => {
  return (
    <ToolBarContainer>
      <ToolBarButtonContainer>
        <IconContainer>
          <TrashCanIcon />
        </IconContainer>
        삭제
      </ToolBarButtonContainer>
    </ToolBarContainer>
  );
};

export default DeleteToolBar;

const IconContainer = styled.div`
  width: 20px;
  height: 20px;
`;
