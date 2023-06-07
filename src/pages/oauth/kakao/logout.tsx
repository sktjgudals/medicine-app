import Title from "@/components/atoms/Title";

import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const logout: FC = () => {
  const router = useRouter();
  useEffect(() => {
    const redirect_uri = localStorage.getItem("redirect_uri");
    if (redirect_uri) {
      router.push(redirect_uri);
      localStorage.removeItem("redirect_uri");
      return router.reload();
    }
    if (router.pathname === "/oauth/kakao/logout") {
      router.push("/");
      return router.reload();
    }
  }, []);
  return (
    <div>
      <Title title={"카카오 로그아웃 - 약정"} content={"약을 찾아주는 요정"} />
    </div>
  );
};

export default logout;
