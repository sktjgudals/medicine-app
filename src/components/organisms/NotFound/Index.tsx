import React from "react";
import { BrowserView, MobileView } from "react-device-detect";

import Mobile from "./Mobile";
import Desktop from "./Desktop";

const Index = () => {
  return (
    <>
      <MobileView>
        {/* <Mobile /> */}
        <Desktop />
      </MobileView>
      <BrowserView>
        <Desktop />
      </BrowserView>
    </>
  );
};

export default Index;
