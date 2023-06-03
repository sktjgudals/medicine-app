import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import { Button } from "@/components/atoms/Button";

import { SESSIONTYPE } from "@/types/session";
import { useMutation } from "@apollo/client";
import { CommentMutation } from "apollo/querys/comment";
import Loading from "@/components/atoms/Loading";

interface Props {
  session: SESSIONTYPE;
  postId: string;
}

const CommentEditor: FC<Props> = ({ session, postId }) => {
  const [mutateFunc, { loading, error }] = useMutation(CommentMutation, {
    update: (cache, { data }) => {
      const cacheId = cache.identify(data.uploadComment);
      cache.modify({
        fields: {
          getComments: (
            existing,
            { fieldName, storeFieldName, toReference }
          ) => {
            if (cacheId) {
              const args = JSON.parse(
                storeFieldName.replace(`${fieldName}:`, "")
              );
              if (postId === args.postId) {
                return {
                  __typename: "GetComment",
                  comments: [toReference(cacheId), ...existing.comments],
                  pageInfo: {
                    __typename: "PageInfo",
                    cursor: existing.pageInfo.cursor,
                    hasNextPage: existing.pageInfo.hasNextPage,
                  },
                };
              }
            }
            return existing;
          },
        },
      });
    },
  });
  const [value, setValue] = useState("");
  const [row, setRow] = useState(1);
  const [submitValue, setSubmitValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.replaceAll("\n", "<br/>");
    setSubmitValue(newValue);
    setValue(e.target.value);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      return setRow(row + 1);
    } else if (e.key === "Backspace") {
      const last = value.charAt(value.length - 1).trim().length === 0;
      if (last) {
        if (row !== 1) {
          return setRow(row - 1);
        } else {
          return setRow(1);
        }
      }
    }
  };

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (session) {
      if (value.replace(/\s/g, "").length === 0) {
        return toast.error("댓글을 입력해주세요.");
      } else {
        const user = {
          id: session.id,
          nickname: session.nickname,
          image: session.image,
        };
        const submitApollo = {
          postId: postId,
          value: submitValue,
          user: user,
          length: row,
        };

        if (row < 3) {
          if (value.length >= 140) {
            submitApollo["length"] = 4;
          }
        }
        const { data } = await mutateFunc({
          variables: {
            ...submitApollo,
          },
        });
        if (data.uploadComment) {
          setValue("");
          setSubmitValue("");
          setRow(1);
        } else {
          return toast.error("댓글 등록에 실패하였습니다.");
        }
      }
    } else {
      return toast.info("로그인이 필요합니다.");
    }
  };

  return (
    <MainContainer>
      <EditorContainer>
        <InputArea
          onChange={onChange}
          value={value}
          placeholder="댓글 추가"
          rows={row}
          onKeyDown={onKeyDown}
        />
      </EditorContainer>
      <ButtonContainer>
        <SubmitButton onClick={submitHandler}>
          {loading ? (
            <Loading
              width={20}
              height={18}
              strokeWidth={10}
              top={0}
              bottom={0}
              right={0}
              left={0}
            />
          ) : (
            "등록"
          )}
        </SubmitButton>
      </ButtonContainer>
    </MainContainer>
  );
};

export default CommentEditor;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 1024px;
  padding: 10px;
`;

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
