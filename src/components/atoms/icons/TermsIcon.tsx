import { BasicIconProps } from "@/types/context/icon/basic";

import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props extends BasicIconProps {}
const TermsIcon: FC<Props> = ({ width, height }) => {
  return (
    <FontAwesomeIcon icon={faClipboardList} width={width} height={height} />
  );
};

export default TermsIcon;
