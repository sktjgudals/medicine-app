import { Input } from "@/components/atoms/Input";
import { FC } from "react";
import styled from "styled-components";

const Title: FC = () => {
  return (
    <TitleContainer>
      <LabelContainer>
        <Label htmlFor="post_title">제목:</Label>
      </LabelContainer>
      <InputContainer>
        <TitleInput type="text" placeholder="입력하세요" id="title" />
      </InputContainer>
    </TitleContainer>
  );
};

export default Title;

const LabelContainer = styled.div``;

const Label = styled.label`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: var(--color-text-label);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-5);
`;

const InputContainer = styled.div`
  display: flex;
  position: relative !important;
  width: 100%;
  flex: 1;
`;

const TitleInput = styled(Input)`
  width: 100%;
  height: var(--input-size-small);
  font-size: var(--input-text-default);
  border-radius: 0.4rem !important;
  padding-left: 10px;
  font-family: inherit;
  border-style: solid;
  border-color: var(--color-border-input);
  color: var(--color-text-input);
  background-color: var(--color-background-input);
  &:hover {
    border-color: var(--color-border-input-focus);
    background-color: var(--color-background-input-focus);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
