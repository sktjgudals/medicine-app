import styled from "styled-components";

interface StyledButtonProps {
  width: number;
  height: number;
}

const Button = styled.button<StyledButtonProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export { Button };
