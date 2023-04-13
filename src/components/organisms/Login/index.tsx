import { FC } from "react";
import { BrowserView, MobileView } from "react-device-detect";

// import Mobile from "./Mobile";
import Desktop from "./Desktop";

interface Props {
  clickModal: () => void;
}

const Login: FC<Props> = ({ clickModal }) => {
  return (
    <>
      <MobileView>{/* <Mobile /> */}</MobileView>
      <BrowserView>
        <Desktop clickModal={clickModal} />
      </BrowserView>
    </>
  );
};

export default Login;
