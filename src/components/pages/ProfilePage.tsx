import { SESSIONTYPE } from "@/types/session";
import { FC } from "react";

interface Props {
  session: SESSIONTYPE | null;
}

const ProfilePage: FC<Props> = ({ session }) => {
  return <div></div>;
};

export default ProfilePage;
