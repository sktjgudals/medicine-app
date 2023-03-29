import { FC } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import Mobile from "./Mobile";
import Desktop from "./Desktop";

const Header: FC = () => {
  return (
    <header>
      <MobileView>
        <Mobile />
      </MobileView>
      <BrowserView>
        <Desktop />
      </BrowserView>
    </header>
  );
};

export default Header;
