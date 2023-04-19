import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import ModalPassword from "../../Modal/ModalPassword";
import LoginEmail from "../../Modal/ModalEmail";
import LoginSubmitButton from "../../Modal/ModalSubmitButton";

import useInput from "@/hooks/useInput";
import ExclamationIcon from "@/components/atoms/icons/ExclamationIcon";
import { emailVerify } from "@/utils/refexp";

const LoginInput: FC = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitOk, setSubmitOk] = useState(false);

  const signInCheckHandler = useCallback(async () => {
    if (email.length > 0 && password.length > 0) {
      const emailCheck = await emailVerify(email);
      if (emailCheck) setSubmitOk(true);
      else setSubmitOk(false);
    } else setSubmitOk(false);
  }, [email, password]);

  const loginHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoginError(!loginError);
    setErrorMessage(`잘못된 비밀번호입니다. 다시 시도하세요.`);
  };

  useEffect(() => {
    signInCheckHandler();
  }, [signInCheckHandler]);

  return (
    <>
      {loginError && (
        <ErrorContainer>
          <ErrorIcon>
            <ExclamationIcon width={30} height={30} color={"red"} />
          </ErrorIcon>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </ErrorContainer>
      )}
      <FormContainer>
        <InputContainer>
          <LoginEmail
            value={email}
            onChangeValue={onChangeEmail}
            text={"이메일"}
            id={"signin_id"}
            checkDuplicate={false}
          />
          <ModalPassword value={password} onChangeValue={onChangePassword} />
          <LoginSubmitButton
            cb={loginHandler}
            text={"로그인"}
            submitOk={submitOk}
            loading={false}
          />
        </InputContainer>
      </FormContainer>
    </>
  );
};

export default LoginInput;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column !important;
  display: flex !important;
`;

const FormContainer = styled.form``;

const ErrorContainer = styled.div`
  display: flex;
  height: 70px;
  background-color: var(--color-background-alt-2);
  border-left: 0.4rem solid #e91916;
  border-radius: 0.3rem;
  margin-top: 2rem;
  padding: 1rem 2rem 1rem 1rem;
`;

const ErrorMessage = styled.div`
  font-size: var(--font-size-9);
  font-weight: var(--font-weight-bold);
`;

const ErrorIcon = styled.div`
  align-items: center;
  padding-right: 10px;
`;
