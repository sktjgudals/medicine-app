import { FC } from "react";
import styled from "styled-components";
import LoginPassword from "./LoginPassword";
import LoginName from "./LoginName";

const LoginInput: FC = () => {
  return (
    <FormContainer>
      <InputContainer>
        <LoginName />
        <LoginPassword />
      </InputContainer>
    </FormContainer>
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
