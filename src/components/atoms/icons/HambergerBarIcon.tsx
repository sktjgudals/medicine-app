import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { BasicIconProps } from "@/types/context/icon/basic";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface Props extends BasicIconProps {
  size: SizeProp;
  color: string;
}

const HambergerBarIcon: FC<Props> = ({
  width,
  height,
  size,
  color,
}): JSX.Element => {
  return (
    <FontAwesomeIcon
      icon={faBars}
      width={width}
      height={height}
      size={size}
      color={color}
    />
  );
};

export default HambergerBarIcon;
