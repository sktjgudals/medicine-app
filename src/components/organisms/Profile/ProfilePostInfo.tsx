import { POST_TYPE } from "@/types/post";
import { SESSIONTYPE } from "@/types/session";
import { FC } from "react";

interface Props {
  posts: [POST_TYPE];
  session: SESSIONTYPE | null;
}

const ProfilePostInfo: FC<Props> = ({ posts, session }) => {
  return <div></div>;
};

export default ProfilePostInfo;
