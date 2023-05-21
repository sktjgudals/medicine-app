import { makeVar } from "@apollo/client";

interface EditorTag {
  name: string;
  id: string;
}

interface EditorError {
  title: string;
  content: string;
}

const modalState = makeVar<boolean>(false);

const signUpModalState = makeVar<boolean>(false);

const imageState = makeVar<boolean>(false);

const dropdownState = makeVar<boolean>(false);

const emailSubmitCheck = makeVar<boolean>(false);

const emailLoadingCheck = makeVar<boolean>(false);

const editorTitleState = makeVar<string>("");

const editorTagState = makeVar<EditorTag[]>([]);

const editorThumbnail = makeVar<string>("");

const editorErrorMessage = makeVar<EditorError>({ title: "", content: "" });

export {
  modalState,
  dropdownState,
  signUpModalState,
  emailSubmitCheck,
  emailLoadingCheck,
  imageState,
  editorTitleState,
  editorTagState,
  editorThumbnail,
  editorErrorMessage,
};
