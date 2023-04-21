import { makeVar } from "@apollo/client";

const modalState = makeVar<boolean>(false);

const signUpModalState = makeVar<boolean>(false);

const dropdownState = makeVar<boolean>(false);

const emailSubmitCheck = makeVar<boolean>(false);

const emailLoadingCheck = makeVar<boolean>(false);

export {
  modalState,
  dropdownState,
  signUpModalState,
  emailSubmitCheck,
  emailLoadingCheck,
};
