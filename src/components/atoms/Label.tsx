import { FC } from "react";
import styled from "styled-components";

interface Props {
  text: string;
  fontSize: number;
}

interface StyledLabelProps {
  fontSize: number;
}

const Label: FC<Props> = ({ text, fontSize }) => {
  return <StyledLabel fontSize={fontSize}>{text}</StyledLabel>;
};

export default Label;

const StyledLabel = styled.label<StyledLabelProps>`
  font-size: ${(props) => props.fontSize}px;
`;
