import styled from "styled-components";
import { Button } from "./Button";

interface ButtonProps {}

const ToolBarButtonContainer = styled(Button)<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding 5px 20px 5px 20px;
  border-radius: 20px;
  background: var(--color-background-radius-button);
  color: var(--color-font-radius-color);
  &:hover {
    opacity: 0.8;
  }
`;

const ToolBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { ToolBarButtonContainer, ToolBarContainer };
