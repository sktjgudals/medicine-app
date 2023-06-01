import { FC, memo } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.bubble.css";
import styles from "#/styles/molecules/Desktop/Editor.module.scss";

interface Props {
  body: string;
}

const QuillLeader: FC<Props> = ({ body }) => {
  return (
    <>
      <ReactQuill
        value={body}
        readOnly={true}
        theme={"bubble"}
        preserveWhitespace={true}
        className={styles.editor}
      />
    </>
  );
};

export default QuillLeader;
