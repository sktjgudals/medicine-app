import { useEffect, useRef, useState } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      console.info("click");
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOutsideClick = (e: Event) => {
    const current = dropdownRef.current;
    console.log("click2");
    if (isOpen && current && !current.contains(e.target as Node))
      setIsOpen(false);
  };

  return { isOpen, dropdownRef, toggleDropdown };
};

export default useDropdown;
