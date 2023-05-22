import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import useInput from "@/hooks/useInput";

import ModalName from "../../Modal/ModalName";
import ModalEmail from "../../Modal/ModalEmail";
import ModalPassword from "../../Modal/ModalPassword";
import ModalSubmitButton from "../../Modal/ModalSubmitButton";

import {
  emailCheckFunc,
  nicknameCheckFunc,
  passwordCheckFunc,
} from "@/utils/func/signUp";
import { useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_LOCAL_USER } from "apollo/querys/signup";
import { useRouter } from "next/router";
import { emailLoadingCheck, emailSubmitCheck } from "apollo/cache";
import { signInSetToken } from "@/utils/func/signIn";

const CHECK_INITIAL_STATE = {
  email: false,
  password: false,
  nickName: false,
};

const MESSAGE_INITIAL_STATE = {
  email: "",
  password: "",
  nickName: "",
};

const SignUpInput: FC = () => {
  const router = useRouter();
  const [createUserFunc, { loading, error }] = useMutation(CREATE_LOCAL_USER, {
    errorPolicy: "all",
  });

  const checkEmail = useReactiveVar(emailSubmitCheck);
  const checkEmailLoading = useReactiveVar(emailLoadingCheck);

  const [email, onChangeEmail] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [check, setCheck] = useState(CHECK_INITIAL_STATE);
  const [message, setMessage] = useState(MESSAGE_INITIAL_STATE);

  const signUpCheckHandler = useCallback(() => {
    emailCheckFunc(setCheck, email, check, setMessage);
    passwordCheckFunc(setCheck, password, check, setMessage);
    nicknameCheckFunc(setCheck, nickName, check, setMessage);
  }, [email, password, nickName]);

  useEffect(() => {
    signUpCheckHandler();
  }, [signUpCheckHandler]);

  let submitOk =
    check["email"] &&
    check["password"] &&
    check["nickName"] &&
    password.length > 0 &&
    nickName.length > 0 &&
    email.length > 0 &&
    checkEmail &&
    !checkEmailLoading;

  const signUpHandler = async (e: any) => {
    if (e.key === "Enter" || e.key === undefined) {
      const { data } = await createUserFunc({
        variables: { email, nickname: nickName, password },
      });
      if (data["createLocalUser"]) {
        signInSetToken(
          data["createLocalUser"]["access_token"],
          data["createLocalUser"]["refresh_token"]
        );
        router.reload();
      }
    }
  };

  return (
    <FormContainer>
      <InputContainer>
        <ModalEmail
          value={email}
          onChangeValue={onChangeEmail}
          text={"이메일"}
          id={"signup_id"}
          setMessage={setMessage}
        />
        <ErrorContainer>{message["email"]}</ErrorContainer>
        <ModalName
          value={nickName}
          onChangeValue={onChangeNickName}
          text={"닉네임"}
          id={"nickName_id"}
          nicknameCheck={check["nickName"]}
          setMessage={setMessage}
        />
        <ErrorContainer>{message["nickName"]}</ErrorContainer>
        <ModalPassword
          value={password}
          onChangeValue={onChangePassword}
          cb={signUpHandler}
          pwdCheck={check["password"]}
        />
        <ErrorContainer>{message["password"]}</ErrorContainer>
        <ModalSubmitButton
          cb={signUpHandler}
          submitOk={submitOk}
          text={"회원가입"}
          loading={loading}
        />
        <ErrorContainer>{error && "회원 생성에 실패했습니다."}</ErrorContainer>
      </InputContainer>
    </FormContainer>
  );
};

export default SignUpInput;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column !important;
  display: flex !important;
`;

const FormContainer = styled.form``;

const ErrorContainer = styled.div`
  padding-top: 0.5rem !important;
  font-size: var(--font-size-9) !important;
  color: var(--color-text-error) !important;
`;
