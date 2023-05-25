import styled from "styled-components";
import { FC, MouseEvent } from "react";

import Loading from "@/components/atoms/Loading";

interface Props {
  cb: (e: any) => void;
  text: string;
  submitOk: boolean;
  loading: boolean;
  color?: string;
}

const ModalSubmitButton: FC<Props> = ({
  cb,
  text,
  submitOk,
  loading,
  color,
}) => {
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
        type={"button"}
        onClick={cb}
        onSubmit={cb}
        style={{ display: submitOk ? "block" : "none", background: color }}
      >
        {loading ? (
          <Loading
            width={30}
            height={30}
            strokeWidth={10}
            top={0}
            bottom={0}
            right={0}
            left={45}
          />
        ) : (
          text
        )}
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
  display: flex;
  align-items: center;
  justify-content: center;
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
