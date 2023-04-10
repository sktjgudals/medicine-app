import { FC } from "react";

import Title from "@/components/atoms/Title";
import Login from "@/components/pages/Login";
import Portal from "@/components/atoms/Portal";

const login: FC = () => {
  return (
    <>
      <Title title={"로그인 - 약정"} content={"약을 찾아주는 요정"} />
      <Portal selector="modal" children={<Login />} />
    </>
  );
};

export default login;
