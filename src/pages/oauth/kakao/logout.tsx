import Title from "@/components/atoms/Title";
import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const logout: FC = () => {
  const router = useRouter();
  useEffect(() => {
    const redirect_uri = localStorage.getItem("redirect_uri");
    if (redirect_uri) {
      router.push(redirect_uri);
      localStorage.removeItem("redirect_uri");
    } else {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <Title title={"카카오 로그아웃 - 약정"} content={"약을 찾아주는 요정"} />
      <NotFoundPage />
    </div>
  );
};

export default logout;
