import { FC, MouseEvent, useCallback, useEffect, useState } from "react";

import styled from "styled-components";

interface Props {
  name: string;
  password: string;
  loginFunc: (e: MouseEvent<HTMLButtonElement>) => void;
}

const LoginSubmitButton: FC<Props> = ({ name, password, loginFunc }) => {
  const [submitOk, setSubmitOk] = useState(false);

  const submitCheckHandler = useCallback(() => {
    if (name.length > 0 && password.length > 0) setSubmitOk(true);
    else setSubmitOk(false);
  }, [name, password]);

  useEffect(() => {
    submitCheckHandler();
  }, [submitCheckHandler]);

  return (
    <SubmitButtonContainer>
      <ButtonNotAllow
        type="button"
        disabled={true}
        style={{ display: submitOk ? "none" : "block" }}
      >
        로그인
      </ButtonNotAllow>
      <ButtonAllow
        type={submitOk ? "submit" : "button"}
        onClick={loginFunc}
        onSubmit={loginFunc}
        style={{ display: submitOk ? "block" : "none" }}
      >
        로그인
      </ButtonAllow>
    </SubmitButtonContainer>
  );
};

export default LoginSubmitButton;

const SubmitButtonContainer = styled.div`
  margin-top: 2rem !important;
`;

const SubmitButton = styled.button`
  width: 100%;
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border: none;
  text-decoration: none;
  user-select: none;
  font-weight: var(--font-weight-semibold);
  border-radius: var(--border-radius-medium);
  font-size: var(--button-text-default);
  height: var(--button-size-default);
`;

const ButtonNotAllow = styled(SubmitButton)`
  opacity: 0.5;
  background-color: var(--color-background-button-disabled);
  color: var(--color-text-button-disabled);
`;

const ButtonAllow = styled(SubmitButton)`
  background-color: var(--color-background-button-primary-default);
  color: var(--color-text-button-primary);
  transition: 0.2s all;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    transform: scale(0.99);
  }
`;
