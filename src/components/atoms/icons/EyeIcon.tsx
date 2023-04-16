import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { BasicIconProps } from "@/types/context/icon/basic";

interface Props extends BasicIconProps {
  visible: boolean;
}

const EyeIcon: FC<Props> = ({ width, height, visible }) => {
  let displayState = "none";
  if (visible) displayState = "block";
  return (
    <FontAwesomeIcon
      icon={faEye}
      width={width}
      height={height}
      style={{ color: "var(--color-text-input)", display: displayState }}
    />
  );
};

export default EyeIcon;
