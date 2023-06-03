import {
  ToolBarButtonContainer,
  ToolBarContainer,
} from "@/components/atoms/ToolBar";
import PenIcon from "@/components/atoms/icons/PenIcon";
import { useRouter } from "next/router";
import { FC } from "react";
import styled from "styled-components";

const ReEditToolBar: FC = () => {
  const router = useRouter();
  const editHandler = () => {
    return router.push(`${router.asPath}/edit`);
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
