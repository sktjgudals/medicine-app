import { FC, MouseEvent, useState } from "react";
import styled from "styled-components";

import LoginPassword from "./LoginPassword";
import LoginName from "./LoginName";
import LoginSubmitButton from "./LoginSubmitButton";

import useInput from "@/hooks/useInput";

const LoginInput: FC = () => {
  const [name, onChangeName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoginError(!loginError);
    setErrorMessage("잘못된 비밀번호입니다. 다시 시도하세요.");
  };

  return (
    <>
      {loginError && (
        <LoginContainer>
          <LoginError>{errorMessage}</LoginError>
        </LoginContainer>
      )}
      <FormContainer>
        <InputContainer>
          <LoginName value={name} onChangeValue={onChangeName} />
          <LoginPassword value={password} onChangeValue={onChangePassword} />
          <LoginSubmitButton
            name={name}
            password={password}
            loginFunc={loginHandler}
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

const LoginContainer = styled.div`
  width: 100%;
  height: 80px;
  border-left: 0.4rem solid #e91916;
  background-color: var(--color-background-alt-2) !important;
  /* border-radius: 0.6rem !important; */
  display: flex !important;
  margin-top: 2rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 1rem 2rem 1rem 1rem !important;
  position: relative !important;
`;

const LoginError = styled.div``;
