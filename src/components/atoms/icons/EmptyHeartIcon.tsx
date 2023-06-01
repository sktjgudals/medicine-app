import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const EmptyHeartIcon: FC = () => {
  return <FontAwesomeIcon icon={faHeart} />;
};

export default EmptyHeartIcon;
