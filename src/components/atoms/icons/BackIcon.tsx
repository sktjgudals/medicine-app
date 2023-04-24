import { FC } from "react";
import { BasicIconProps } from "@/types/context/icon/basic";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends BasicIconProps {
  color?: string;
}

const BackIcon: FC<Props> = ({ width, height }) => {
  return <FontAwesomeIcon icon={faArrowLeft} width={width} height={height} />;
};

export default BackIcon;
