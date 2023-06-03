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

const nickNameSubmitCheck = makeVar<boolean>(false);

const nickNameLoadingCheck = makeVar<boolean>(false);

const editorTitleState = makeVar<string>("");

const editorTagState = makeVar<EditorTag[]>([]);

const editorThumbnail = makeVar<string>("");

const profileImageState = makeVar<string>("");

const editorErrorMessage = makeVar<EditorError>({
  title: "",
  content: "본문이 비어있습니다.",
});

const commentEditMode = makeVar<string>("");

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
  nickNameLoadingCheck,
  nickNameSubmitCheck,
  profileImageState,
  commentEditMode,
};
