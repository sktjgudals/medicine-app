import { ChangeEvent, FC, useEffect, useState } from "react";
import { editorTitleState, editorErrorMessage } from "apollo/cache";

import styled from "styled-components";
import { Input } from "@/components/atoms/Input";
import { useReactiveVar } from "@apollo/client";

interface Props {
  edit: boolean;
  postTitle?: string;
}

const Title: FC<Props> = ({ edit, postTitle }) => {
  const error = useReactiveVar(editorErrorMessage);
  const [title, setTitle] = useState(edit && postTitle ? postTitle : "");

  useEffect(() => {
    if (title.length === 0) {
      editorErrorMessage({
        title: "제목이 비어있습니다",
        content: error.content,
      });
    } else {
      editorErrorMessage({
        title: "",
        content: error.content,
      });
    }
  }, [title]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
    editorTitleState(e.target.value);
  };

  return (
    <TitleContainer>
      <InputContainer>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          id="title"
          value={title}
          onChange={onChangeHandler}
        />
      </InputContainer>
      <ErrorContainer>{error.title}</ErrorContainer>
    </TitleContainer>
  );
};

export default Title;

const InputContainer = styled.div`
  display: flex;
  position: relative !important;
  width: 100%;
  flex: 1;
`;

const TitleInput = styled(Input)`
  width: 100%;
  height: var(--input-size-small);
  font-size: var(--input-text-default);
  border-radius: 0.4rem !important;
  font-size: 1.125rem;
  line-height: 2rem;
  padding-left: 10px;
  font-family: inherit;
  color: var(--color-text-input);
  background-color: var(--color-background-input-focus);
  border 2px solid;
  border-color: var(--color-border-input);
  &:hover {
    border-color: var(--color-border-input-focus);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 0rem 0rem 0.5rem;
  color: red;
  font-size: var(--font-size-8);
`;
