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
import { useRouter } from "next/router";
import { tokenCall } from "@/utils/varible";

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
          toast.error("이미지를 등록하는 도중 에러가 발생하였습니다.");
        }
      } else {
        toast.error("로그아웃후, 로그인을 다시 시도하시길 바랍니다.");
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
  const [mutateFunc, post] = useMutation(PostDataMutation);
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

  const submitHandler = async (e: any) => {
    setLoading(true);
    let newTag = [];
    for (let i = 0; i < tag.length; i++) {
      if (tag[i].name.length === 0) {
      } else {
        const tagContent = { id: tag[i].id, name: tag[i].name };
        newTag.push(tagContent);
      }
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
        variables: { postData: JSON.stringify(res), token: access },
      })
        .then(({ data }) => {
          editorTagState([]);
          editorErrorMessage({ title: "", content: "" });
          editorTitleState("");
          editorThumbnail("");
          const { post, token } = data.postDataCreate;
          setLoading(false);
          if (!token) {
            toast.error("로그아웃후, 로그인을 다시 시도하시길 바랍니다.");
          } else {
            return router.push(`/post/${post["id"]}`);
          }
        })
        .catch((e) => {
          editorTagState([]);
          editorErrorMessage({ title: "", content: "" });
          editorTitleState("");
          editorThumbnail("");
          toast.error("새로고침후, 다시 시도해주시길 바랍니다.");
          setLoading(false);
        });
    } else {
      editorTagState([]);
      editorErrorMessage({ title: "", content: "" });
      editorTitleState("");
      editorThumbnail("");
      toast.error("로그아웃후, 로그인을 다시 시도하시길 바랍니다.");
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
  width: 100%;
  padding: 20px 0px 0px 0px;
`;

const EditorContainer = styled.div`
  display: flex;
  min-height: 300px;
`;

const SubmitContainer = styled.div`
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 0rem 0rem rem;
  color: red;
  font-size: var(--font-size-8);
`;
