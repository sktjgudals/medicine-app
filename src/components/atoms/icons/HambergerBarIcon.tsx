import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import { BasicIconProps } from "@/types/context/icon/basic";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface Props extends BasicIconProps {
  size: SizeProp;
}

const HambergerBarIcon: FC<Props> = ({ width, height, size }) => {
  return (
    <FontAwesomeIcon icon={faBars} width={width} height={height} size={size} />
  );
};

export default HambergerBarIcon;
