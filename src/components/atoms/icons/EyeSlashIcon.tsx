import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { BasicIconProps } from "@/types/context/icon/basic";

interface Props extends BasicIconProps {
  visible: boolean;
}

const EyeSlashIcon: FC<Props> = ({ width, height, visible }) => {
  let displayState = "none";
  if (visible) displayState = "block";
  return (
    <FontAwesomeIcon
      icon={faEyeSlash}
      width={width}
      height={height}
      style={{ color: "var(--color-text-input)", display: displayState }}
    />
  );
};

export default EyeSlashIcon;
