import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props {
  color?: string;
}

const HeartIcon: FC<Props> = () => {
  return <FontAwesomeIcon icon={faHeart} />;
};

export default HeartIcon;
