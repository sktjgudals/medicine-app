import useInput from "@/hooks/useInput";
import { FC } from "react";

const SignUpInput: FC = () => {
  const [name, onChangeName] = useInput("");
  return <div></div>;
};

export default SignUpInput;
