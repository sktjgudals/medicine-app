import { FC } from "react";
import Desktop from "./Desktop";
import { BrowserView, MobileView } from "react-device-detect";

const PostDetect: FC = () => {
  return (
    <div>
      <BrowserView>
        <Desktop />
      </BrowserView>
      <MobileView>
        <Desktop />
      </MobileView>
    </div>
  );
};

export default PostDetect;
