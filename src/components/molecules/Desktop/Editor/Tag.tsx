import { FC, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Input } from "@/components/atoms/Input";
import XIcon from "@/components/atoms/icons/XIcon";
import { useMutation, useReactiveVar } from "@apollo/client";
import { editorTagState } from "apollo/cache";
import { PostTagMutation } from "apollo/querys/post";
import Loading from "@/components/atoms/Loading";
import { POST_TAG_TYPE } from "@/types/post";

interface Props {
  edit: boolean;
  tagArr?: [POST_TAG_TYPE];
}

const Tag: FC<Props> = ({ edit, tagArr }) => {
  const reactiveTag = useReactiveVar(editorTagState);
  const [mutateFunc, { loading, error }] = useMutation(PostTagMutation);
  const [tag, setTag] = useState<string>("");
  useEffect(() => {
    return () => {
      if (edit) {
        if (tagArr) {
          for (let i = 0; i < tagArr.length; i++) {
            append(tagArr[i]);
          }
        }
      } else {
        editorTagState([]);
      }
    };
  }, []);
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
    if (edit && tagArr) {
      tagArr.splice(idx - 1, 1);
    }
    remove(idx);
  };

  const inputOnclick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (tag.length !== 0) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].name === tag) return;
      }
      const { data } = await mutateFunc({ variables: { postTag: tag } });
      if (data.postTagCreate) {
        append(data.postTagCreate);
        if (edit) {
          tagArr?.push(data.postTagCreate);
        } else {
          reactiveTag.push(data.postTagCreate);
        }
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
            placeholder="태그를 입력하세요"
          />
          {tag.length !== 0 && (
            <TagButtonContainer style={{ marginLeft: "5px" }}>
              <TagButton onClick={inputOnclick}>태그등록</TagButton>
            </TagButtonContainer>
          )}

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
  border: 1px solid var(--color-green-9);
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
