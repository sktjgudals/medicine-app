import styled from "styled-components";

export interface ToggleProps {
  width: number;
  height: number;
}

export const Toggle = styled.button<ToggleProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
`;

export const Circle = styled.div<ToggleProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 50px;
`;
