import styled from "styled-components";
import { FC, MouseEvent } from "react";

interface Props {
  cb: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
  submitOk: boolean;
}

const ModalSubmitButton: FC<Props> = ({ cb, text, submitOk }) => {
  //   console.info("hi");
  //   console.info("submi" + submitOk);
  return (
    <SubmitButtonContainer>
      <ButtonNotAllow
        type="button"
        disabled={true}
        style={{ display: submitOk ? "none" : "block" }}
      >
        {text}
      </ButtonNotAllow>
      <ButtonAllow
        type={submitOk ? "submit" : "button"}
        onClick={cb}
        onSubmit={cb}
        style={{ display: submitOk ? "block" : "none" }}
      >
        {text}
      </ButtonAllow>
    </SubmitButtonContainer>
  );
};

export default ModalSubmitButton;

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