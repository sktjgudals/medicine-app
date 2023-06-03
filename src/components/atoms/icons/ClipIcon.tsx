import { FC } from "react";
import { BasicIconProps } from "@/types/context/icon/basic";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends BasicIconProps {
  color?: string;
}

const ClipIcon: FC<Props> = ({ width, height }) => {
  return <FontAwesomeIcon icon={faPaperclip} width={width} height={height} />;
};

export default ClipIcon;
