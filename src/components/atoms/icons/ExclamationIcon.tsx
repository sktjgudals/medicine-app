import { BasicIconProps } from "@/types/context/icon/basic";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props extends BasicIconProps {
  color: string;
}
const ExclamationIcon: FC<Props> = ({ width, height, color }) => {
  return (
    <FontAwesomeIcon
      icon={faCircleExclamation}
      width={width}
      height={height}
      color={color}
    />
  );
};

export default ExclamationIcon;
