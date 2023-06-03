import { FC, KeyboardEvent, MouseEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Input } from "@/components/atoms/Input";
import XIcon from "@/components/atoms/icons/XIcon";
import { useMutation, useReactiveVar } from "@apollo/client";
import { editorTagState } from "apollo/cache";
import { PostTagMutation } from "apollo/querys/post";
import Loading from "@/components/atoms/Loading";

const Tag: FC = () => {
  const reactiveTag = useReactiveVar(editorTagState);
  const [mutateFunc, { loading, error }] = useMutation(PostTagMutation);
  const [tag, setTag] = useState<string>("");
  const { control } = useForm({
    defaultValues: {
      tag: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tag",
  });

  const subColorQuanaity = (idx: number) => (e: any) => {
    e.preventDefault();
    remove(idx);
  };

  const inputKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter") {
      if (tag.length !== 0) {
        for (let i = 0; i < fields.length; i++) {
          if (fields[i].name === tag) return;
        }
        const { data } = await mutateFunc({ variables: { postTag: tag } });
        if (data.postTagCreate) {
          reactiveTag.push(data.postTagCreate);
          append(data.postTagCreate);
          return setTag("");
        }
      }
    }
  };

  const inputOnclick = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (tag.length !== 0) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].name === tag) return;
      }
      const { data } = await mutateFunc({ variables: { postTag: tag } });
      if (data.postTagCreate) {
        reactiveTag.push(data.postTagCreate);
        append(data.postTagCreate);
        return setTag("");
      }
    }
  };

  return (
    <MainContainer>
      <InputContainer>
        <TagContainer>
          {fields.map((field, idx) => (
            <div key={idx}>
              {idx > 0 && (
                <TagButtonContainer onClick={subColorQuanaity(idx)}>
                  <TagButton>{field.name}</TagButton>
                  <Xbutton>
                    <XIcon width={10} height={10} />
                  </Xbutton>
                </TagButtonContainer>
              )}
            </div>
          ))}
          <TagInput
            type="text"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            onClick={inputOnclick}
            placeholder="태그를 입력하세요"
            onKeyUp={inputKeyDown}
          />
          {loading && (
            <LoadingContainer>
              <Loading
                width={20}
                height={20}
                strokeWidth={10}
                top={0}
                bottom={10}
                right={0}
                left={0}
              />
            </LoadingContainer>
          )}
        </TagContainer>
      </InputContainer>
    </MainContainer>
  );
};

export default Tag;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative !important;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-wrap: wrap;
`;

const TagInput = styled(Input)`
  display: inline-flex;
  border-radius: 1rem;
  padding-left: 10px;
  cursor: text;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-input);
  border 2px solid;
  background-color: var(--color-background-input-focus);
  border-color: var(--color-border-input);
  &:hover {
    border-color: var(--color-border-input-focus);
  }
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
`;

const TagButtonContainer = styled.div`
  display: flex;
  height: 2rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--color-background-button);
  color: var(--color-green-9);
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
  border: none;
  cursor: pointer;
`;

const TagButton = styled.button`
  font-size: 1rem;
  background-color: var(--color-background-button);
  border: none;
  cursor: pointer;
  color: var(--color-green-9);
`;

const Xbutton = styled.div`
  display: flex;
  align-items: center;
`;

const LoadingContainer = styled.div`
  position: relative;
  top: -5px;
  left: 5px;
`;
