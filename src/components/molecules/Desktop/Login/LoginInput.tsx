import { Input } from "@/components/atoms/Input";
import useInput from "@/hooks/useInput";
import { FC } from "react";

import styled from "styled-components";

const LoginInput: FC = () => {
  const [userFormInput, onChangeForm] = useInput("");

  return (
    <InputContainer>
      <EmailInput value={userFormInput} onChange={onChangeForm} />
    </InputContainer>
  );
};

export default LoginInput;

const EmailInput = styled(Input)``;

const InputContainer = styled.div``;
