import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import ModalPassword from "../../Modal/ModalPassword";
import LoginEmail from "../../Modal/ModalEmail";
import LoginSubmitButton from "../../Modal/ModalSubmitButton";

import useInput from "@/hooks/useInput";
import ExclamationIcon from "@/components/atoms/icons/ExclamationIcon";
import { emailVerify } from "@/utils/refexp";
import { useMutation } from "@apollo/client";
import { SIGNIN_LOCAL_USER } from "apollo/querys/signin";
import { signInSetToken } from "@/utils/func/signIn";

const LoginInput: FC = () => {
  const router = useRouter();
  const [signinUserFunc, { loading, error }] = useMutation(SIGNIN_LOCAL_USER, {
    errorPolicy: "all",
  });
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

  const signinHandler = async (e: any) => {
    if (e.key === "Enter" || e.key === undefined) {
      const { data } = await signinUserFunc({ variables: { email, password } });
      if (data["signinLocalUser"] !== null) {
        if (data["signinLocalUser"]["error"]) {
          setLoginError(true);
          return setErrorMessage(
            `서비스 오류입니다. 다시 시도해주시거나 문의해주시기 바랍니다.`
          );
        }
        signInSetToken(
          data["signinLocalUser"]["access_token"],
          data["signinLocalUser"]["refresh_token"]
        );
        router.reload();
      } else {
        setLoginError(true);
        setErrorMessage(`잘못된 비밀번호입니다. 다시 시도하세요.`);
      }
    }
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
          />
          <ModalPassword
            value={password}
            onChangeValue={onChangePassword}
            cb={signinHandler}
          />
          <LoginSubmitButton
            cb={signinHandler}
            text={"로그인"}
            submitOk={submitOk}
            loading={loading}
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
  align-items: center;
`;

const ErrorMessage = styled.div`
  font-size: var(--font-size-9);
  font-weight: var(--font-weight-bold);
`;

const ErrorIcon = styled.div`
  align-items: center;
  padding-right: 10px;
`;
