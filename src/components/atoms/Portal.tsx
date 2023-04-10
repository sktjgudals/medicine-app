import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  selector: string;
}

const Portal: FC<PortalProps> = ({ children, selector }) => {
  const selectedElement = document.getElementById(selector);
  if (selectedElement === null) return <></>;
  return createPortal(children, selectedElement);
};

export default Portal;
