import { FC, useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";

// import Mobile from "./Mobile";
import Desktop from "./Desktop";

interface Props {
  toggleDropDown: () => void;
}

const Login: FC<Props> = ({ toggleDropDown }) => {
  useEffect(() => {
    toggleDropDown();
  });
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
