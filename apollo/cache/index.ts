import { makeVar } from "@apollo/client";

const modalState = makeVar<boolean>(false);

const dropdownState = makeVar<boolean>(false);

export { modalState, dropdownState };
