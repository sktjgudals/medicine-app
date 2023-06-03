import dynamic from "next/dynamic";
import { FC } from "react";

import Title from "@/components/atoms/Title";

const Desktop = dynamic(() => import("@/components/organisms/SignUp/Desktop"), {
  ssr: false,
  loading: () => null,
});

const signup: FC = () => {
  return (
    <div>
      <Title title={"회원가입 - 약정"} content={"약을 찾아주는 요정"} />
      <Desktop />
    </div>
  );
};

export default signup;
