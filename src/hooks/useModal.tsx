import { useCallback, useEffect, useRef, useState } from "react";

const useModal = () => {
  console.info("초기화");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  const clickModal = useCallback(
    () => setIsOpenModal((prev) => !prev),
    [isOpenModal]
  );

  const handleOutsideClick = (e: Event) => {
    const current = modalRef.current;
    if (isOpenModal && current && !current.contains(e.target as Node))
      setIsOpenModal(false);
  };

  return { isOpenModal, clickModal, modalRef };
};

export default useModal;
