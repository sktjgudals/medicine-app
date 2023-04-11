import { useEffect, useRef, useState } from "react";

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpenModal]);
  console.info(isOpenModal);
  const clickModal = () => setIsOpenModal((prev) => !prev);

  const handleOutsideClick = (e: Event) => {
    const current = modalRef.current;
    if (isOpenModal && current && !current.contains(e.target as Node))
      setIsOpenModal(false);
  };

  return { isOpenModal, clickModal, modalRef };
};

export default useModal;
