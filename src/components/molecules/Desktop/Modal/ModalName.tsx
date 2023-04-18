import { FC } from "react";
import styled from "styled-components";

import { Input } from "@/components/atoms/Input";

interface Props {
  value: string;
  onChangeValue: () => void;
  text: string;
  id: string;
}

const ModalName: FC<Props> = ({ value, onChangeValue, text, id }) => {
  return (
    <NameContainer>
      <NameLabelContainer>
        <NameLabel htmlFor={`${text}_input`}>{text}</NameLabel>
      </NameLabelContainer>
      <NameInputContainer>
        <NameInput
          value={value}
          onChange={onChangeValue}
          id={`${id}_input`}
          autoComplete="username"
          autoCapitalize="off"
          autoCorrect="off"
          type="text"
        />
      </NameInputContainer>
    </NameContainer>
  );
};

export default ModalName;

const NameLabelContainer = styled.div`
  margin-bottom: 0.5rem !important;
  display: flex !important;
  -webkit-box-align: center !important;
  align-items: center !important;
`;

const NameLabel = styled.label`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: var(--color-text-label);
  font-weight: var(--font-weight-bold);
`;

const NameContainer = styled.div`
  margin-top: 1.5rem !important;
`;

const NameInputContainer = styled.div`
  display: flex;
  position: relative !important;
`;

const NameInput = styled(Input)`
  width: 100%;
  height: var(--input-size-xsmall);
  font-size: var(--input-text-default);
  border-radius: 0.4rem !important;
  padding-left: 10px;
  font-family: inherit;
  border-style: solid;
  border-width: var(--border-width-input);
  border-color: var(--color-border-input);
  color: var(--color-text-input);
  background-color: var(--color-background-input);
  &:hover {
    border-color: var(--color-border-input-focus);
    background-color: var(--color-background-input-focus);
  }
`;
