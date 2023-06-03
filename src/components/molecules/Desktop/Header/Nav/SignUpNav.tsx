import { FC } from "react";
import useSignUpModal from "@/hooks/useSignUpModal";

import SignUpIcon from "@/components/atoms/icons/SignUpIcon";
import Portal from "@/components/atoms/Portal";
import SignUp from "@/components/organisms/SignUp/Desktop";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";

interface Props {
  toggleDropDown: () => void;
}

const SignUpNav: FC<Props> = ({ toggleDropDown }) => {
  const { clickModal, isOpenModal } = useSignUpModal();

  const handleClick = async () => {
    clickModal();
  };

  return (
    <NavContainer>
      <NavButton onClick={() => handleClick().then(toggleDropDown)}>
        <SignUpIcon width={19} height={19} />
        <NavText>회원가입</NavText>
      </NavButton>
      {isOpenModal && <Portal selector={"modal"} children={<SignUp />} />}
    </NavContainer>
  );
};

export default SignUpNav;
