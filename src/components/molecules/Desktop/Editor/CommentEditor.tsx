import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import { Button } from "@/components/atoms/Button";

import { SESSIONTYPE } from "@/types/session";
import { useMutation } from "@apollo/client";
import { CommentMutation } from "apollo/querys/comment";
import Loading from "@/components/atoms/Loading";
import {
  ButtonContainer,
  EditorContainer,
  InputArea,
  SubmitButton,
} from "@/components/atoms/Comment";

interface Props {
  session: SESSIONTYPE;
  postId: string;
}

const CommentEditor: FC<Props> = ({ session, postId }) => {
  let count = 0;
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

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value.replaceAll("\n", "<br/>");
      setSubmitValue(newValue);
      setValue(e.target.value);
    },
    [value]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      return setRow(row + 1);
    } else if (e.key === "Backspace") {
      let searchChar = "<br/>"; // 찾으려는 문자
      let pos = submitValue.indexOf(searchChar); //pos는 0의 값을 가집니다.
      while (pos !== -1) {
        count++;
        pos = submitValue.indexOf(searchChar, pos + 1); // 첫 번째 a 이후의 인덱스부터 a를 찾습니다.
      }
      if (row !== 1) {
        return setRow(count);
      }
    } else {
      return;
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
