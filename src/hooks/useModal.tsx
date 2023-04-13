import { useCallback, useEffect, useRef, useState } from "react";

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // const modalRef = useRef<HTMLDivElement>(null);

  const clickModal = useCallback(
    () => setIsOpenModal((prev) => !prev),
    [isOpenModal]
  );

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
