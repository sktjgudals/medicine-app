import { FC } from "react";

import SignInIcon from "@/components/atoms/icons/SignInIcon";

import useModal from "@/hooks/useModal";
import Portal from "@/components/atoms/Portal";
import Login from "@/components/organisms/Login";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";

interface Props {
  toggleDropDown: () => void;
}

const SignIn: FC<Props> = ({ toggleDropDown }) => {
  const { clickModal, isOpenModal } = useModal();
  const handleClick = async () => {
    clickModal();
  };

  return (
    <NavContainer style={{ marginTop: "10px" }}>
      <NavButton onClick={() => handleClick().then(toggleDropDown)}>
        <SignInIcon width={19} height={19} />
        <NavText>로그인</NavText>
      </NavButton>
      {isOpenModal && <Portal selector={"modal"} children={<Login />} />}
    </NavContainer>
  );
};

export default SignIn;
