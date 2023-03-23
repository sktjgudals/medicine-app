import { FC } from "react";

interface Props {
  text?: string;
}

const Button: FC<Props> = ({ text }) => {
  if (text) {
    return (
      <div>
        <button>{text}</button>
      </div>
    );
  }
  return (
    <div>
      <button></button>
    </div>
  );
};

export default Button;
