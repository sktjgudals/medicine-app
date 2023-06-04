import { FC } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  color?: string;
  width?: number;
  height?: number;
}

const ImageIcon: FC<Props> = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      icon={faImage}
      color={color}
      width={width}
      height={height}
    />
  );
};

export default ImageIcon;
