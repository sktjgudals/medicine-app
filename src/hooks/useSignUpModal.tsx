import { useCallback } from "react";

import { signUpModalState } from "apollo/cache";
import { useReactiveVar } from "@apollo/client";

const useSignUpModal = () => {
  let isOpenModal = useReactiveVar(signUpModalState);

  const clickModal = useCallback(() => {
    signUpModalState(!isOpenModal);
  }, [isOpenModal]);

  return { isOpenModal, clickModal };
};

export default useSignUpModal;
