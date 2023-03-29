import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props {
  width: number;
  height: number;
}
const SearchIcon: FC<Props> = ({ width, height }) => {
  return (
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      width={width}
      height={height}
      // color={"green"}
    />
  );
};

export default SearchIcon;
