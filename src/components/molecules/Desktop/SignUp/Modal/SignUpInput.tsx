import useInput from "@/hooks/useInput";
import { FC, useCallback, useEffect, useState } from "react";
import ModalName from "../../Modal/ModalName";
import ModalEmail from "../../Modal/ModalEmail";
import styled from "styled-components";
import ModalPassword from "../../Modal/ModalPassword";
import ModalSubmitButton from "../../Modal/ModalSubmitButton";

import {
  emailCheckFunc,
  nicknameCheckFunc,
  passwordCheckFunc,
} from "@/utils/func/signUp";

const INITIAL_STATE = {
  email: false,
  password: false,
  nickName: false,
};

const SignUpInput: FC = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [check, setCheck] = useState(INITIAL_STATE);

  const signUpCheckHandler = useCallback(() => {
    emailCheckFunc(setCheck, email, check);
    passwordCheckFunc(setCheck, password, check);
    nicknameCheckFunc(setCheck, nickName, check);
  }, [email, password, nickName]);

  useEffect(() => {
    signUpCheckHandler();
  }, [signUpCheckHandler]);

  const signUpHandler = () => {};

  return (
    <FormContainer>
      <InputContainer>
        <ModalEmail
          value={email}
          onChangeValue={onChangeEmail}
          text={"이메일"}
          id={"signup_id"}
        />
        <EmailErrorContainer></EmailErrorContainer>
        <ModalName
          value={nickName}
          onChangeValue={onChangeNickName}
          text={"닉네임"}
          id={"nickName_id"}
        />
        <NickNameErrorContainer></NickNameErrorContainer>
        <ModalPassword value={password} onChangeValue={onChangePassword} />
        <PasswordErrorContainer></PasswordErrorContainer>
        <ModalSubmitButton
          cb={signUpHandler}
          submitOk={check["email"] && check["password"] && check["nickName"]}
          text={"회원가입"}
        />
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

const EmailErrorContainer = styled.div``;

const NickNameErrorContainer = styled.div``;

const PasswordErrorContainer = styled.div``;
