import Title from "@/components/atoms/Title";
import Desktop from "@/components/organisms/SignUp/Desktop";
import { FC } from "react";

const signup: FC = () => {
  return (
    <div>
      <Title title={"회원가입 - 약정"} content={"약을 찾아주는 요정"} />
      <Desktop />
    </div>
  );
};

export default signup;
