import { FC } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  color?: string;
}

const EmptyHeartIcon: FC<Props> = ({ color }) => {
  return <FontAwesomeIcon icon={faHeart} color={color} />;
};

export default EmptyHeartIcon;
