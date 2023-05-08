import { FC, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import styled from "styled-components";
import { useTheme } from "@/context/ThemeProvider";

const MainEditor: FC = () => {
  const [theme] = useTheme();
  const [data, setData] = useState();
  //   const toolbarItems = [
  //     ["heading", "bold", "italic", "strike"],
  //     ["hr"],
  //     ["ul", "ol", "task"],
  //     ["table", "link"],
  //     ["image"],
  //     ["code"],
  //     ["scrollSync"],
  //   ];
  return (
    <MainContainer>
      <DarkEditor displayState={theme === "dark" ? "block" : "none"}>
        <Editor
          initialValue={data}
          placeholder="입력해주세요"
          height="100vh"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          plugins={[colorSyntax]}
          theme={"dark"}
        />
      </DarkEditor>
      <LightEditor displayState={theme === "dark" ? "none" : "block"}>
        <Editor
          initialValue={data}
          placeholder="입력해주세요"
          height="100vh"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          plugins={[colorSyntax]}
        />
      </LightEditor>
    </MainContainer>
  );
};

export default MainEditor;

const MainContainer = styled.div`
margin 0 auto;
width:100%;
padding:20px 0px 0px 0px;
`;

interface DarkProps {
  displayState: string;
}

const DarkEditor = styled.div<DarkProps>`
  display: ${(props) => props.displayState};
`;

const LightEditor = styled.div<DarkProps>`
  display: ${(props) => props.displayState};
`;
