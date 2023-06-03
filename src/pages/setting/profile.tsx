import { FC } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useSession } from "@/hooks/useSession";

import Title from "@/components/atoms/Title";

const ProfilePage = dynamic(
  () => import("@/components/pages/Setting/ProfilePage"),
  {
    ssr: false,
    loading: () => null,
  }
);

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
