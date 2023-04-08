import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { BasicIconProps } from "@/types/context/icon/basic";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface Props extends BasicIconProps {
  size?: SizeProp;
  color?: string;
}

const MoonIcon: FC<Props> = ({ size, width, height, color }): JSX.Element => {
  return (
    <FontAwesomeIcon
      icon={faMoon}
      width={width}
      height={height}
      color={color}
    />
  );
};

export default MoonIcon;
