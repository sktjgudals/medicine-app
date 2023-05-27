import Title from "@/components/atoms/Title";
import NotFound from "@/components/pages/404";
import SecurityPage from "@/components/pages/Setting/SecurityPage";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/router";
import { FC } from "react";

const security: FC = () => {
  const router = useRouter();
  const { loading, session } = useSession();
  if (loading) return <></>;

  if (!session) {
    router.push("/");
    return <NotFound />;
  }

  return (
    <div>
      <Title title={"보안 - 약정"} content={"약을 찾아주는 요정"} />
      {session && <SecurityPage session={session} />}
    </div>
  );
};

export default security;
