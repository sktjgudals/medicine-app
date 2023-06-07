import Title from "@/components/atoms/Title";
import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const logout: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    const redirect_uri = localStorage.getItem("redirect_uri");
    if (redirect_uri) {
      router.push(redirect_uri);
      router.reload();
      localStorage.removeItem("redirect_uri");
      setLoading(false);
    } else {
      router.push("/");
      router.reload();
      setLoading(false);
    }
  }, []);
  if (loading) return <></>;
  return (
    <div>
      <Title title={"카카오 로그아웃 - 약정"} content={"약을 찾아주는 요정"} />
      <NotFoundPage />
    </div>
  );
};

export default logout;
