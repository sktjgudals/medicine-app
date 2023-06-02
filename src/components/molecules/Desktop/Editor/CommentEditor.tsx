import { FC, MouseEvent, useMemo, useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";

import "react-quill/dist/quill.snow.css";
import styles from "#/styles/molecules/Desktop/Editor.module.scss";

import { Button } from "@/components/atoms/Button";

import { SESSIONTYPE } from "@/types/session";
import { useMutation } from "@apollo/client";
import { CommentMutation } from "apollo/querys/comment";

interface Props {
  session: SESSIONTYPE;
  postId: string;
}

const CommentEditor: FC<Props> = ({ session, postId }) => {
  const [mutateFunc, { loading, error }] = useMutation(CommentMutation);
  const [value, setValue] = useState("");

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
        ],
      },
    }),
    []
  );

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (session) {
      if (value.length === 0) {
        return toast.error("댓글을 입력해주세요.");
      } else {
        const user = {
          id: session.id,
          nickname: session.nickname,
          image: session.image,
        };
        const { data } = await mutateFunc({
          variables: {
            postId: postId,
            value: value,
            user: user,
            length: value.length,
          },
        });
        console.info(data);
      }
    } else {
      return toast.info("로그인이 필요합니다.");
    }
  };

  return (
    <MainContainer>
      <EditorContainer>
        <ReactQuill
          className={styles.comment_editor}
          modules={modules}
          onChange={(value) => setValue(value === "<p><br></p>" ? "" : value)}
          scrollingContainer={styles.scrolling_container}
        />
      </EditorContainer>
      <ButtonContainer>
        <SubmitButton onClick={submitHandler}>등록</SubmitButton>
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
  height: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const SubmitButton = styled(Button)`
  padding: 20px 40px 20px 40px;
  background: var(--color-green-9);
  color: var(--color-white-2);
  border-radius: 10px;
  &: active {
    transform: scale(0.9);
  }
`;
