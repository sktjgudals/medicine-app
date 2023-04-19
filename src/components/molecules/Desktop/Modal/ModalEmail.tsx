import { ChangeEvent, FC, useCallback, useState } from "react";
import styled from "styled-components";

import { emailSubmitCheck } from "apollo/cache";

import { Input } from "@/components/atoms/Input";
import Loading from "@/components/atoms/Loading";
import SubmitCheck from "./SubmitCheck";
import { findUserEmail } from "apollo/querys/signup";

interface Props {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  text: string;
  id: string;
  checkDuplicate: boolean;
}

interface DuplicateProps {
  loading: boolean;
}

const DuplicatedValue: FC<DuplicateProps> = ({ loading }) => {
  return (
    <>
      {loading ? (
        <Loading
          width={20}
          height={20}
          strokeWidth={10}
          top={0}
          bottom={0}
          right={0}
          left={0}
        />
      ) : (
        <SubmitCheck />
      )}
    </>
  );
};

const ModalEmail: FC<Props> = ({
  value,
  onChangeValue,
  text,
  id,
  checkDuplicate,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  // 이거 훅으로 만들수있을거같음
  const debounceFunction = (callback: any, delay: any) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      if (args[0].length > 0) {
        setLoading(true);
        // 실행한 함수(setTimeout())를 취소
        clearTimeout(timer);
        // delay가 지나면 callback 함수를 실행
        timer = setTimeout(() => callback(...args), delay);
      } else {
        setLoading(false);
      }
    };
  };

  const checkDuplicateValue = useCallback(
    debounceFunction((value: any) => apiCall(value), 500),
    []
  );

  const apiCall = async (value: string) => {
    const { data } = await findUserEmail(value);
    if (data.findUserEmail === null) {
      emailSubmitCheck(true);
      setLoading(false);
    } else {
      emailSubmitCheck(false);
      setLoading(false);
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
          <EmailLoadingContainer>
            {checkDuplicate && <DuplicatedValue loading={loading} />}
          </EmailLoadingContainer>
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

const EmailLoadingContainer = styled.div`
  position: absolute;
  right: 0;
  padding-right: 40px;
`;

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
