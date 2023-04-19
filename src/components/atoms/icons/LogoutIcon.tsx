import { FC } from "react";
import { BasicIconProps } from "@/types/context/icon/basic";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends BasicIconProps {}

const LogoutIcon: FC<Props> = ({ width, height }) => {
  return (
    <FontAwesomeIcon icon={faRightFromBracket} width={width} height={height} />
  );
};

export default LogoutIcon;
