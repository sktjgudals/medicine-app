import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { BasicIconProps } from "@/types/context/icon/basic";

interface Props extends BasicIconProps {
  color?: string;
}

const SearchIcon: FC<Props> = ({ width, height, color }) => {
  return (
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      width={width}
      height={height}
      color={color}
    />
  );
};

export default SearchIcon;
