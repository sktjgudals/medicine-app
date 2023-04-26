import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback } from "react";
import styled from "styled-components";

import { emailLoadingCheck, emailSubmitCheck } from "apollo/cache";

import { Input } from "@/components/atoms/Input";
import { findUserEmail } from "apollo/querys/signup";
import { emailVerify } from "@/utils/refexp";
import DuplicatedValue from "./DuplicatedValue";
import { useReactiveVar } from "@apollo/client";
import { ERROR_PROPS } from "@/types/signup";

interface Props {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  id: string;
  checkDuplicate: boolean;
  setMessage?: Dispatch<SetStateAction<ERROR_PROPS>>;
}

const ModalEmail: FC<Props> = ({
  value,
  onChangeValue,
  text,
  id,
  checkDuplicate,
  setMessage,
}) => {
  const loading = useReactiveVar(emailLoadingCheck);
  const checkEmail = useReactiveVar(emailSubmitCheck);
  // 이거 훅으로 만들수있을거같음
  const debounceFunction = (callback: any, delay: any) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      if (args[0].length > 0) {
        emailLoadingCheck(true);
        // 실행한 함수(setTimeout())를 취소
        clearTimeout(timer);
        // delay가 지나면 callback 함수를 실행
        timer = setTimeout(() => callback(...args), delay);
      } else {
        emailLoadingCheck(false);
      }
    };
  };

  const checkDuplicateValue = useCallback(
    debounceFunction((value: any) => apiCall(value), 500),
    []
  );

  const apiCall = async (value: string) => {
    const res = await emailVerify(value);
    if (res) {
      const { data } = await findUserEmail(value);
      if (data.findUserEmail === null) {
        emailSubmitCheck(true);
        emailLoadingCheck(false);
        if (setMessage) {
          setMessage((prev) => {
            return {
              ...prev,
              email: "",
            };
          });
        }
      } else {
        if (setMessage) {
          setMessage((prev) => {
            return {
              ...prev,
              email: "중복된 이메일이 있습니다.",
            };
          });
        }
        emailSubmitCheck(false);
        emailLoadingCheck(false);
      }
    } else {
      emailSubmitCheck(false);
      emailLoadingCheck(false);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e);
    if (checkDuplicate) {
      checkDuplicateValue(e.target.value);
    }
  };

  return (
    <EmailContainer>
      <EmailLabelContainer>
        <EmailLabel htmlFor={`${text}_input`}>{text}</EmailLabel>
        {value.length > 0 && (
          <>
            {checkDuplicate && (
              <DuplicatedValue loading={loading} check={checkEmail} />
            )}
          </>
        )}
      </EmailLabelContainer>
      <EmailInputContainer>
        <EmailInput
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e)}
          id={`${id}_input`}
          autoComplete="username"
          autoCapitalize="off"
          autoCorrect="off"
          type="text"
        />
      </EmailInputContainer>
    </EmailContainer>
  );
};

export default ModalEmail;

const EmailLabelContainer = styled.div`
  margin-bottom: 0.5rem !important;
  display: flex !important;
  -webkit-box-align: center !important;
  align-items: center !important;
`;

const EmailLabel = styled.label`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: var(--color-text-label);
  font-weight: var(--font-weight-bold);
`;

const EmailContainer = styled.div`
  margin-top: 1.5rem !important;
`;

const EmailInputContainer = styled.div`
  display: flex;
  position: relative !important;
`;

const EmailInput = styled(Input)`
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
  //   border-color: red;
  &:hover {
    border-color: var(--color-border-input-focus);
    background-color: var(--color-background-input-focus);
  }
`;
