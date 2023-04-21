import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BasicIconProps } from "@/types/context/icon/basic";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

interface Props extends BasicIconProps {}

const SignUpIcon: FC<Props> = ({ width, height }) => {
  return <FontAwesomeIcon icon={faUserPlus} width={width} height={height} />;
};

export default SignUpIcon;
