import { FC } from "react";
import { BrowserView, MobileView } from "react-device-detect";

// import Mobile from "./Mobile";
import Desktop from "./Desktop";

const Login: FC = () => {
  return (
    <>
      <MobileView>{/* <Mobile /> */}</MobileView>
      <BrowserView>
        <Desktop />
      </BrowserView>
    </>
  );
};

export default Login;
