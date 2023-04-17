import useInput from "@/hooks/useInput";
import { FC } from "react";
import ModalName from "../../Modal/ModalName";
import styled from "styled-components";
import ModalPassword from "../../Modal/ModalPassword";

const SignUpInput: FC = () => {
  const [name, onChangeName] = useInput("");
  const [password, onChangePassword] = useInput("");
  return (
    <>
      <FormContainer>
        <InputContainer>
          <ModalName
            value={name}
            onChangeValue={onChangeName}
            text={"아이디"}
            id={"signup_id"}
          />
          <ModalPassword value={password} onChangeValue={onChangePassword} />
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
