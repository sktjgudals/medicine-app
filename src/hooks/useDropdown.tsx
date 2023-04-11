import { useCallback, useEffect, useRef, useState } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = useCallback(
    () => setIsOpen((prevIsOpen) => !prevIsOpen),
    [isOpen]
  );

  const handleOutsideClick = (e: Event) => {
    const current = dropdownRef.current;
    if (isOpen && current && !current.contains(e.target as Node))
      setIsOpen(false);
  };

  return { isOpen, dropdownRef, toggleDropdown };
};

export default useDropdown;
