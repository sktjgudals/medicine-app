import { FC, useRef } from "react";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useTheme } from "@/context/ThemeProvider";

const MainEditor: FC = () => {
  const [theme] = useTheme();
  const editorRef = useRef() as any;
  //   const toolbarItems = [
  //     ["heading", "bold", "italic", "strike"],
  //     ["hr"],
  //     ["ul", "ol", "task"],
  //     ["table", "link"],
  //     ["image"],
  //     ["code"],
  //     ["scrollSync"],
  //   ];

  const btnHandler = () => {
    const instance = editorRef.current.getInstance();
    const html = instance.getHTML();
    console.info(JSON.stringify(html));
  };

  return (
    <MainContainer>
      <Editor
        ref={editorRef}
        language="kr"
        initialValue={"본문"}
        height="100vh"
        initialEditType={"wysiwyg"}
        useCommandShortcut={false}
        plugins={[colorSyntax]}
        theme={theme === "dark" ? "dark" : ""}
      />
      <button onClick={btnHandler}>제출</button>
    </MainContainer>
  );
};

export default MainEditor;

const MainContainer = styled.div`
margin 0 auto;
width:100%;
padding:20px 0px 0px 0px;
`;
