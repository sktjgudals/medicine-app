import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  selector: string;
}

const Portal: FC<PortalProps> = ({ children, selector }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById(selector));
  }, [element]);

  if (element) return createPortal(children, element);

  return null;
};

export default Portal;
