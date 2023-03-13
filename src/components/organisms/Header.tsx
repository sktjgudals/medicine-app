import { FC } from "react";
import Search from "../molecules/Search";
import Logo from "../atoms/Logo";

const Header: FC = () => {
  return (
    <header>
      <Logo width={100} height={100} />
      <Search />
    </header>
  );
};

export default Header;
