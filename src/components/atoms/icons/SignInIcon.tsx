import { FC } from "react";

import { BasicIconProps } from "@/types/context/icon/basic";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends BasicIconProps {
  color?: string;
}

const SignInIcon: FC<Props> = ({ width, height }) => {
  return (
    <FontAwesomeIcon icon={faRightToBracket} width={width} height={height} />
  );
};

export default SignInIcon;
