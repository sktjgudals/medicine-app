import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BasicIconProps } from "@/types/context/icon/basic";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface Props extends BasicIconProps {
  color: string;
}

const CheckIcon: FC<Props> = ({ width, height, color }) => {
  return (
    <FontAwesomeIcon
      icon={faCircleCheck}
      width={width}
      height={height}
      color={color}
    />
  );
};

export default CheckIcon;
