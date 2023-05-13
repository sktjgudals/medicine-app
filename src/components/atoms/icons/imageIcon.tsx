import { FC } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  color?: string;
}

const ImageIcon: FC<Props> = ({ color }) => {
  return <FontAwesomeIcon icon={faImage} color={color} />;
};

export default ImageIcon;
