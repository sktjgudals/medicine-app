import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props {
  color?: string;
}

const HeartIcon: FC<Props> = ({ color }) => {
  return <FontAwesomeIcon icon={faHeart} color={color} />;
};

export default HeartIcon;
