import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  selector: string;
}

const Portal: FC<PortalProps> = ({ children, selector }) => {
  if (typeof window === "object") {
    return createPortal(
      children,
      document.getElementById(selector) as HTMLElement
    );
  }
  return null;
};

export default Portal;
