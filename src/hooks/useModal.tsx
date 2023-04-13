import { useCallback } from "react";

import { modalState } from "apollo/cache";
import { useReactiveVar } from "@apollo/client";

const useModal = () => {
  let isOpenModal = useReactiveVar(modalState);

  const clickModal = useCallback(() => {
    modalState(!isOpenModal);
  }, [isOpenModal]);

  return { isOpenModal, clickModal };
};

export default useModal;
