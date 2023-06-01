import {
  ToolBarButtonContainer,
  ToolBarContainer,
} from "@/components/atoms/ToolBar";
import PenIcon from "@/components/atoms/icons/PenIcon";
import { FC } from "react";
import styled from "styled-components";

const ReEditToolBar: FC = () => {
  return (
    <ToolBarContainer>
      <ToolBarButtonContainer>
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
