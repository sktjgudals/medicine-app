import { Input } from "@/components/atoms/Input";
import XIcon from "@/components/atoms/icons/XIcon";
import { FC, KeyboardEvent, MouseEvent, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

const Tag: FC = () => {
  const [tag, setTag] = useState<string>("");
  const { control, register } = useForm({
    defaultValues: {
      tag: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `tag`,
  });

  const subColorQuanaity = (idx: number) => (e: any) => {
    e.preventDefault();
    remove(idx);
  };

  const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter") {
      if (tag.length !== 0) {
        append({ name: tag });
        return setTag("");
      }
    } else if (e.key === "Backspace") {
      if (tag.length === 0) {
        return remove(fields.length - 1);
      }
    }
  };

  const inputOnclick = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (tag.length !== 0) {
      append({ name: tag });
      setTag("");
    }
  };
  return (
    <MainContainer>
      <InputContainer>
        <TagContainer>
          {fields.map((field, idx) => (
            <div key={idx}>
              {idx > 0 && (
                <TagButtonContainer>
                  <TagButton onClick={subColorQuanaity(idx)}>
                    {field.name}
                  </TagButton>
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
  gap: 10px;
  padding-top: 20px;
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
  padding-left: 12px;
  outline: none;
  cursor: text;
  font-size: 1.125rem;
  line-height: 2rem;
  margin-bottom: 0.75rem;
  border: none;
  background-color: var(--color-background-input-focus);
  color: var(--color-text-input);
    border 2px solid;
  border-color: var(--color-border-input);
  &:hover {
    border-color: var(--color-magenta-12);
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
  color: var(--color-magenta-12);
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
  color: var(--color-magenta-12);
`;

const Xbutton = styled.div`
  display: flex;
  align-items: center;
`;
