import { FC } from "react";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BasicIconProps } from "@/types/context/icon/basic";

interface Props extends BasicIconProps {
  color?: string;
}

const UploadIcon: FC<Props> = ({ color, width, height }) => {
  return (
    <FontAwesomeIcon
      icon={faArrowUpFromBracket}
      color={color}
      width={width}
      height={height}
    />
  );
};

export default UploadIcon;
