import { Input } from "@/components/atoms/Input";
import { FC } from "react";
import styled from "styled-components";

const Tag: FC = () => {
  return (
    <TagContainer>
      <LabelContainer>
        <Label htmlFor="post_tag">태그:</Label>
      </LabelContainer>
      <InputContainer>
        <TagInput type="text" placeholder="태그를 입력해주세요" />
      </InputContainer>
    </TagContainer>
  );
};

export default Tag;

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
`;

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

const TagInput = styled(Input)`
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
