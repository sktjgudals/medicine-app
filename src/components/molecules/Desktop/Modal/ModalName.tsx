import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from "react";
import styled from "styled-components";
import { nickNameLoadingCheck, nickNameSubmitCheck } from "apollo/cache";

import { Input } from "@/components/atoms/Input";
import DuplicatedValue from "./DuplicatedValue";
import { debounceFunc } from "@/utils/func/common";
import { useReactiveVar } from "@apollo/client";
import { ERROR_PROPS } from "@/types/signup";
import { findUserNickname } from "apollo/querys/signup";

interface Props {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  id: string;
  nicknameCheck: boolean;
  setMessage: Dispatch<SetStateAction<ERROR_PROPS>>;
}

const ModalName: FC<Props> = ({
  value,
  onChangeValue,
  text,
  id,
  nicknameCheck,
  setMessage,
}) => {
  const nickNameSubmit = useReactiveVar(nickNameSubmitCheck);
  const nickNameLoading = useReactiveVar(nickNameLoadingCheck);

  const checkDuplicateValue = useCallback(
    debounceFunc((value: any) => apiCall(value), 300),
    []
  );

  const apiCall = async (value: string) => {
    const { data } = await findUserNickname(value);
    if (data.findUserNickname === null) {
      nickNameSubmitCheck(true);
      nickNameLoadingCheck(false);
      if (setMessage) {
        setMessage((prev) => {
          return {
            ...prev,
            nickName: "",
          };
        });
      }
    } else {
      if (setMessage) {
        setMessage((prev) => {
          return {
            ...prev,
            nickName: "중복된 닉네임이 있습니다.",
          };
        });
      }
      nickNameSubmitCheck(false);
      nickNameLoadingCheck(false);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    checkDuplicateValue(e.target.value);
    onChangeValue(e);
    nickNameLoadingCheck(true);
  };
  return (
    <NameContainer>
      <NameLabelContainer>
        <NameLabel htmlFor={`${text}_input`}>{text}</NameLabel>
        {value.length > 0 && (
          <DuplicatedValue
            loading={nickNameLoading}
            check={nickNameSubmit && nicknameCheck}
          />
        )}
      </NameLabelContainer>
      <NameInputContainer>
        <NameInput
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e)}
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
