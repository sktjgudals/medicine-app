import { useCallback, useEffect, useRef } from "react";

import { modalState } from "apollo/cache/modal";
import { useReactiveVar } from "@apollo/client";

const useModal = () => {
  let isOpenModal = useReactiveVar(modalState);
  // const modalRef = useRef<HTMLDivElement>(null);

  const clickModal = useCallback(() => {
    modalState(!isOpenModal);
  }, [isOpenModal]);

  //     useEffect(() => {
  //       console.info("clickoutside");
  //       document.addEventListener("click", handleOutsideClick);
  //       return () => {
  //         document.removeEventListener("click", handleOutsideClick);
  //       };
  //     });

  // const handleOutsideClick = (e: Event) => {
  //   const current = modalRef.current;
  //   if (isOpenModal && current && !current.contains(e.target as Node))
  //     setIsOpenModal(false);
  // };

  return { isOpenModal, clickModal };
};

export default useModal;
