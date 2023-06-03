import { toast } from "react-toastify";
import { imageBase64Func } from "./api/image";
import { quillObj } from "@/components/molecules/Desktop/Editor/MainEditor";

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

const modules = {
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
};

export { modules };
