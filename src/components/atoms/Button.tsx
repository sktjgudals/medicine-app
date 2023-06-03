import styled from "styled-components";

interface StyledButtonProps {
  width?: number;
  height?: number;
}
interface ColorButtonProps {
  backgroundColor?: string;
  color?: string;
}

const Button = styled.button<StyledButtonProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: none;
  cursor: pointer;
`;

const ColorButton = styled(Button)<ColorButtonProps>`
  display: flex;
  color: ${(props) =>
    props.color ? props.color : "var(--color-fill-button-icon)"};
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 0.5rem;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : " var(--color-background-button-text-default)"};
  cursor: pointer;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  &:active {
    position: relative;
    top: 1px;
    right: 1px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

export { Button, ColorButton };
