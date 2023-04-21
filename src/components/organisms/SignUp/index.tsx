import { FC } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import Desktop from "./Desktop";

const index: FC = () => {
  return (
    <>
      <MobileView>{/* <Mobile /> */}</MobileView>
      <BrowserView>
        <Desktop />
      </BrowserView>
    </>
  );
};

export default index;
