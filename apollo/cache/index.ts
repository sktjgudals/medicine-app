import { makeVar } from "@apollo/client";

interface EditorTag {
  name: string;
  id: string;
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
};
