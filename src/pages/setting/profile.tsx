import Title from "@/components/atoms/Title";
import ProfilePage from "@/components/pages/Setting/ProfilePage";

import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/router";
import { FC } from "react";

const profile: FC = () => {
  const router = useRouter();
  const { loading, session } = useSession();
  if (loading) return <></>;

  if (!session) {
    router.push("/");
  }

  return (
    <div>
      <Title title={"설정 - 약정"} content={"약을 찾아주는 요정"} />
      {session && <ProfilePage session={session} />}
    </div>
  );
};

export default profile;
