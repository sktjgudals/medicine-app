import styled from "styled-components";

import { ToggleProps, Toggle, Circle } from "@/components/atoms/Toggle";

interface StyledProps extends ToggleProps {
  toggle: "dark" | "light";
}

export const ToggleBtn = styled(Toggle)<StyledProps>`
  background-color: ${(props) =>
    props.toggle === "light" ? "none" : "var(--color-green-9)"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

export const ToggleCircle = styled(Circle)<StyledProps>`
  position: absolute;
  left: 2%;
  background-color: white;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle === "dark" &&
    `
      transform: translate(12px, 0);
    `}
`;
