import { modalState } from "apollo/cache";

import { FC } from "react";
import styled from "styled-components";

import XIcon from "@/components/atoms/icons/XIcon";
import { Button } from "@/components/atoms/Button";

const LoginCloseButton: FC = () => {
  return (
    <StyledButtonContainer>
      <StyledXButton
        width={30}
        height={30}
        aria-label="팝업 닫기"
        onClick={() => modalState(false)}
      >
        <XIcon width={20} height={20} />
      </StyledXButton>
    </StyledButtonContainer>
  );
};

export default LoginCloseButton;

const StyledButtonContainer = styled.div`
  position: absolute;
  left: auto;
  right: 1rem;
  top: 1rem;
  margin-left: 0.5rem;
`;

const StyledXButton = styled(Button)`
  position: relative;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  border-radius: var(--border-radius-medium);
  width: 2rem;
  height: 2rem;
  background-color: var(--color-background-button-text-default);
  color: var(--color-fill-button-icon);
`;
