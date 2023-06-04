import ReactQuill from "react-quill";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import "react-quill/dist/quill.snow.css";
import styles from "#/styles/molecules/Desktop/Editor.module.scss";

import {
  editorErrorMessage,
  editorTagState,
  editorThumbnail,
  editorTitleState,
} from "apollo/cache";
import { PostUpdateMutation } from "apollo/querys/post";
import ModalSubmitButton from "../Modal/ModalSubmitButton";
import { tokenCall } from "@/utils/varible";
import { modules } from "@/utils/editor";

interface Props {
  body: string;
  postId: string;
  tagArr: any[];
}
export let editQuillObj = null as any;

const MainReEditor: FC<Props> = ({ body, postId, tagArr }) => {
  const title = useReactiveVar(editorTitleState);
  const thumbnail = useReactiveVar(editorThumbnail);
  const error = useReactiveVar(editorErrorMessage);
  const [editor, setEditor] = useState<string>(body);
  const [done, setDone] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [mutateFunc, post] = useMutation(PostUpdateMutation, {
    update: (cache, { data }) => {
      //   cache.modify({ fields: { getProfileData: () => {} } });
      //   cache.evict({ fieldName: "postGetData" });
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (editor.length === 0) {
      editorErrorMessage({
        title: error.title,
        content: "본문이 비어있습니다.",
      });
    } else {
      editorErrorMessage({
        title: error.title,
        content: "",
      });
    }
  }, [editor]);

  useEffect(() => {
    editorTagState([]);
    editorTitleState("");
    editorThumbnail("");
    setLoading(false);
  }, [done]);

  const submitOk = title.length !== 0 && editor.length !== 0;

  const submitHandler = async (e: any) => {
    setLoading(true);
    let newTag = [];
    for (let i = 0; i < tagArr.length; i++) {
      newTag.push(tagArr[i].id);
    }
    const res = {
      title,
      tag: newTag,
      thumbnail,
      body: editor,
    };

    const { access } = tokenCall();
    if (access) {
      mutateFunc({
        variables: { postData: JSON.stringify(res), postId },
      })
        .then(({ data }) => {
          if (data.postUpdate) {
            const { id, num } = data.postUpdate;
            setDone(true);
            return router.push(`/post/${num}`);
          } else {
            toast.error("글 작성중 오류가 발생하였습니다.");
          }
        })
        .catch((e) => {
          toast.error("새로고침후, 다시 시도해주시길 바랍니다.");
          setDone(true);
        });
    } else {
      setDone(true);
      toast.error("로그아웃후, 로그인을 다시 시도하시길 바랍니다.");
    }
  };

  const cancelHandler = (e: any) => {
    router.push(`${router.asPath.split("/edit")[0]}`);
  };

  return (
    <MainContainer>
      <EditorContainer>
        <ReactQuill
          ref={(el) => {
            editQuillObj = el;
          }}
          onChange={(value) => setEditor(value === "<p><br></p>" ? "" : value)}
          modules={modules}
          value={editor}
          className={styles.editor}
        />
      </EditorContainer>
      <SubmitContainer>
        <ErrorContainer>{error.content}</ErrorContainer>
        <ButtonContainer>
          <ModalSubmitButton
            cb={cancelHandler}
            loading={false}
            text={"취소하기"}
            submitOk={submitOk}
            color="var(--color-background-radius-button)"
          />
          <ModalSubmitButton
            cb={submitHandler}
            loading={loading}
            text={"변경하기"}
            submitOk={submitOk}
          />
        </ButtonContainer>
      </SubmitContainer>
    </MainContainer>
  );
};

export default MainReEditor;

const MainContainer = styled.div`
  margin 0 auto;
  width: 100%;
  padding: 20px 0px 0px 0px;
`;

const EditorContainer = styled.div`
  display: flex;
  min-height: 500px;
  padding-bottom: 50px;
`;

const SubmitContainer = styled.div`
  width: 100%;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
  @media screen and (max-width: 500px) {
    padding-top: 50px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  color: red;
  font-size: var(--font-size-7);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  gap: 10px;
`;
