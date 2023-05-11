import { useCallback } from "react";

import { imageState } from "apollo/cache";
import { useReactiveVar } from "@apollo/client";

const useImageModal = () => {
  let isOpenModal = useReactiveVar(imageState);

  const clickModal = useCallback(() => {
    imageState(!isOpenModal);
  }, [isOpenModal]);

  return { isOpenModal, clickModal };
};

export default useImageModal;
