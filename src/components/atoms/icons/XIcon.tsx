import { FC } from "react";

import { BasicIconProps } from "@/types/context/icon/basic";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends BasicIconProps {}

const XIcon: FC<Props> = ({ width, height }) => {
  return <FontAwesomeIcon icon={faXmark} width={width} height={height} />;
};

export default XIcon;
