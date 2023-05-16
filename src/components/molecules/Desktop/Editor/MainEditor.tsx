import { FC, useMemo } from "react";
import * as DOMPurify from "dompurify";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { imageBase64Func } from "@/utils/api/image";
import useEditorForm from "@/hooks/useEditorForm";

const imageHandler = async () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.addEventListener("change", async () => {
    if (input.files) {
      const result = await imageBase64Func(input.files[0]);
    } else {
    }
  });
};

const MainEditor: FC = () => {
  const { handleSubmit, register, trigger, setValue, watch } =
    useEditorForm("onChange");

  const a = watch();
  console.info(a);
  const onChangeHandler = (value: string) => {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    // onChange 됐는지 react-hook-form에 알려주는 기능
    trigger("contents");
  };

  const submitHandler = (data: any) => {
    console.info(data);
    let clean = DOMPurify.sanitize(data.contents);
    console.info(clean);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          ["image"],
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
      <ReactQuill
        onChange={onChangeHandler}
        modules={modules}
        placeholder="입력해주세요"
      />
      <button onClick={handleSubmit(submitHandler)}>제출</button>
    </MainContainer>
  );
};

export default MainEditor;

const MainContainer = styled.div`
margin 0 auto;
width:100%;
padding:20px 0px 0px 0px;
`;

// const modules =useMemo( {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ font: [] }],
//       [{ align: [] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ list: "ordered" }, { list: "bullet" }, "link"],
//       [
//         {
//           color: [
//             "#000000",
//             "#e60000",
//             "#ff9900",
//             "#ffff00",
//             "#008a00",
//             "#0066cc",
//             "#9933ff",
//             "#ffffff",
//             "#facccc",
//             "#ffebcc",
//             "#ffffcc",
//             "#cce8cc",
//             "#cce0f5",
//             "#ebd6ff",
//             "#bbbbbb",
//             "#f06666",
//             "#ffc266",
//             "#ffff66",
//             "#66b966",
//             "#66a3e0",
//             "#c285ff",
//             "#888888",
//             "#a10000",
//             "#b26b00",
//             "#b2b200",
//             "#006100",
//             "#0047b2",
//             "#6b24b2",
//             "#444444",
//             "#5c0000",
//             "#663d00",
//             "#666600",
//             "#003700",
//             "#002966",
//             "#3d1466",
//             "custom-color",
//           ],
//         },
//         { background: [] },
//       ],
//       ["image", "video"],
//       ["clean"],
//     ],
//   },
// }
