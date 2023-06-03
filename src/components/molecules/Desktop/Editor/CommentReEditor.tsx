import { toast } from "react-toastify";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useMutation } from "@apollo/client";
import { SESSIONTYPE } from "@/types/session";
import { CommentReMutation } from "apollo/querys/comment";
import {
  ButtonContainer,
  EditorContainer,
  InputArea,
  SubmitButton,
} from "@/components/atoms/Comment";
import Loading from "@/components/atoms/Loading";
import styled from "styled-components";
import { commentEditMode } from "apollo/cache";

interface Props {
  commentId: string;
  body: string;
  length: number;
  session: SESSIONTYPE;
}

const CommentReEditor: FC<Props> = ({ commentId, session, body, length }) => {
  let count = 0;
  const [mutateFunc, { loading, error }] = useMutation(CommentReMutation);
  const [value, setValue] = useState(body);
  const [row, setRow] = useState(length);
  const [submitValue, setSubmitValue] = useState(body);

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

  const cancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    return commentEditMode("");
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
          commentId: commentId,
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
        if (data.updateComment) {
          return commentEditMode("");
        } else {
          return toast.error("댓글 수정에 실패하였습니다.");
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
          rows={row}
          onKeyDown={onKeyDown}
        />
      </EditorContainer>
      <ButtonContainer>
        <SubmitButton onClick={cancelHandler}>취소</SubmitButton>
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

export default CommentReEditor;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
`;
