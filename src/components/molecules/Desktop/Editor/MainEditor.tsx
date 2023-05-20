import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useMutation, useReactiveVar } from "@apollo/client";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import { imageBase64Func } from "@/utils/api/image";
import styles from "#/styles/molecules/Desktop/Editor.module.scss";

import {
  editorErrorMessage,
  editorTagState,
  editorThumbnail,
  editorTitleState,
} from "apollo/cache";
import { PostDataMutation } from "apollo/querys/post";
import ModalSubmitButton from "../Modal/ModalSubmitButton";
import { toast } from "react-toastify";

let quillObj: any;

const imageHandler = async () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.addEventListener("change", async () => {
    if (input.files) {
      const result = (await imageBase64Func(input.files[0])) as string;
      const token = localStorage.getItem("access_token");
      if (token && result) {
        const { url, error } = await fetch("/api/v1/image", {
          method: "POST",
          body: result,
          headers: {
            Authorization: token,
          },
        })
          .then((data) => {
            return data.json();
          })
          .catch((e) => {
            console.info(e);
          });
        if (url) {
          const range = quillObj.getEditorSelection();
          quillObj.getEditor().insertEmbed(range.index, "image", url);
        } else {
          console.info(error);
        }
      } else {
        console.info("로그인필요");
      }
    } else {
      console.info("이미지 등록");
    }
  });
};

const MainEditor: FC = () => {
  const title = useReactiveVar(editorTitleState);
  const tag = useReactiveVar(editorTagState);
  const thumbnail = useReactiveVar(editorThumbnail);
  const error = useReactiveVar(editorErrorMessage);
  const [editor, setEditor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const submitOk = error.title.length === 0 && error.content.length === 0;
  const [mutatieFunc, post] = useMutation(PostDataMutation);

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

  const submitHandler = async (e: any) => {
    setLoading(true);
    let filterdTag = tag.filter((it) => it.name.length !== 0);

    const res = {
      title,
      tag: filterdTag,
      thumbnail,
      body: editor,
    };
    const token = localStorage.getItem("access_token");
    if (token) {
      mutatieFunc({ variables: { postData: JSON.stringify(res), token } })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      toast.error("로그인 에러");
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <MainContainer>
      <EditorContainer>
        <ReactQuill
          ref={(el) => {
            quillObj = el;
          }}
          onChange={(value) => setEditor(value === "<p><br></p>" ? "" : value)}
          modules={modules}
          className={styles.editor}
        />
      </EditorContainer>
      <SubmitContainer>
        <ErrorContainer>{error.content}</ErrorContainer>
        <ModalSubmitButton
          cb={submitHandler}
          loading={loading}
          text={"작성하기"}
          submitOk={submitOk}
        />
      </SubmitContainer>
    </MainContainer>
  );
};

export default MainEditor;

const MainContainer = styled.div`
margin 0 auto;
width:100%;
padding:20px 0px 0px 0px;
`;

const EditorContainer = styled.div`
  display: flex;
  min-height: 300px;
`;

const SubmitContainer = styled.div`
  // padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 0rem 0rem rem;
  color: red;
  font-size: var(--font-size-8);
`;
