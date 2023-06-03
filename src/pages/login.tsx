import { FC } from "react";
import dynamic from "next/dynamic";

import Title from "@/components/atoms/Title";

const Login = dynamic(() => import("@/components/pages/LoginPage"), {
  ssr: false,
  loading: () => null,
});

const login: FC = () => {
  return (
    <>
      <Title title={"로그인 - 약정"} content={"약을 찾아주는 요정"} />
      <Login />
    </>
  );
};

export default login;
