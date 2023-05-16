import { FC } from "react";
import useEditorForm from "@/hooks/useEditorForm";
import styled from "styled-components";
import { Input } from "@/components/atoms/Input";

const Title: FC = () => {
  const { register, trigger, setValue, watch } = useEditorForm("onChange");

  const onChangeHandler = (value: string) => {
    setValue("title", value);
    // onChange 됐는지 react-hook-form에 알려주는 기능
    trigger("title");
  };
  return (
    <TitleContainer>
      <InputContainer>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          id="title"
          // onChange={(e) => onChangeHandler(e.target.value)}
          {...register("title")}
        />
      </InputContainer>
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
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
