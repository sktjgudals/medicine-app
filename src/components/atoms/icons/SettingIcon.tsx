import { BasicIconProps } from "@/types/context/icon/basic";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props extends BasicIconProps {}

const SettingIcon: FC<Props> = ({ width, height }) => {
  return <FontAwesomeIcon icon={faGear} width={width} height={height} />;
};

export default SettingIcon;
