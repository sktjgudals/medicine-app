import useInput from "@/hooks/useInput";
import { FC } from "react";
import ModalName from "../../Modal/ModalName";
import styled from "styled-components";
import ModalPassword from "../../Modal/ModalPassword";
import ModalSubmitButton from "../../Modal/ModalSubmitButton";

const SignUpInput: FC = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [password, onChangePassword] = useInput("");

  const signUpHandler = () => {};
  return (
    <>
      <FormContainer>
        <InputContainer>
          <ModalName
            value={email}
            onChangeValue={onChangeEmail}
            text={"이메일"}
            id={"signup_id"}
          />
          <ModalName
            value={nickName}
            onChangeValue={onChangeNickName}
            text={"닉네임"}
            id={"nickName_id"}
          />
          <ModalPassword value={password} onChangeValue={onChangePassword} />
          <ModalSubmitButton
            name={email}
            password={password}
            cb={signUpHandler}
            status="signUp"
            text={"회원가입"}
          />
        </InputContainer>
      </FormContainer>
    </>
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
