import { BasicIconProps } from "@/types/context/icon/basic";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props extends BasicIconProps {
  color?: string;
}
const UserIcon: FC<Props> = ({ width, height, color }) => {
  return (
    <FontAwesomeIcon
      icon={faUser}
      width={width}
      height={height}
      color={color}
    />
  );
};

export default UserIcon;
