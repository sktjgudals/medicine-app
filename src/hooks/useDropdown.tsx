import { useCallback, useEffect, useRef } from "react";

import { dropdownState } from "apollo/cache";
import { useReactiveVar } from "@apollo/client";

const useDropdown = () => {
  let isOpen = useReactiveVar(dropdownState);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = useCallback(() => dropdownState(!isOpen), [isOpen]);

  const handleOutsideClick = (e: Event) => {
    const current = dropdownRef.current;
    if (isOpen && current && !current.contains(e.target as Node))
      dropdownState(false);
  };

  return { isOpen, dropdownRef, toggleDropdown };
};

export default useDropdown;
