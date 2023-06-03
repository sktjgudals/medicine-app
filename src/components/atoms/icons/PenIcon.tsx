import { BasicIconProps } from "@/types/context/icon/basic";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props extends BasicIconProps {
  color?: string;
}

const PenIcon: FC<Props> = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon icon={faPen} color={color} width={width} height={height} />
  );
};

export default PenIcon;
