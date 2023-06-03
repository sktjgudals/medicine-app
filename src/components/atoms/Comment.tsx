import styled from "styled-components";
import { Button } from "./Button";

const EditorContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
  justify-content: flex-end;
`;

const SubmitButton = styled(Button)`
  padding: 10px 40px 10px 40px;
  background: var(--color-green-9);
  color: var(--color-white-2);
  border-radius: 10px;
  &: active {
    transform: scale(0.9);
  }
  &:hover {
    opacity: 0.9;
  }
`;

const InputArea = styled.textarea`
  width: 100%;
  border: none;
  border-bottom: 2px solid #aaa;
  padding-left: 10px;
  padding-bottom: 10px;
  background-color: transparent;
  font-size: var(--font-size-8);
  color: var(--color-font-radius-color);
  margin-bottom: 5px;
  resize: none;
  outline: none;
  transition: 0.5s;
  overflow: visable;
  &: focus {
    border-bottom: 2px solid var(--color-green-12);
  }
`;

export { InputArea, SubmitButton, ButtonContainer, EditorContainer };
