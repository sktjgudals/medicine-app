import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BasicIconProps } from "@/types/context/icon/basic";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface Props extends BasicIconProps {
  color?: string;
}

const EmailIcon: FC<Props> = ({ width, height }) => {
  return <FontAwesomeIcon icon={faEnvelope} width={width} height={height} />;
};

export default EmailIcon;
