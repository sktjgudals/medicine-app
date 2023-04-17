import { FC } from "react";

import styled from "styled-components";
import SignUpIcon from "@/components/atoms/icons/SignUpIcon";
import Portal from "@/components/atoms/Portal";
import SignUp from "@/components/organisms/SignUp";

import useSignUpModal from "@/hooks/useSignUpModal";

interface Props {
  toggleDropDown: () => void;
}

const SignUpNav: FC<Props> = ({ toggleDropDown }) => {
  const { clickModal, isOpenModal } = useSignUpModal();

  const handleClick = async () => {
    clickModal();
  };

  return (
    <SignUpContainer>
      <SignUpButton onClick={() => handleClick().then(toggleDropDown)}>
        <SignUpIcon width={19} height={19} />
        <SignUpText>회원가입</SignUpText>
      </SignUpButton>
      {isOpenModal && <Portal selector={"modal"} children={<SignUp />} />}
    </SignUpContainer>
  );
};

export default SignUpNav;

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 10px 0px 10px 0px;
`;

const SignUpButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-right: 25px;
  gap: 5px;
`;

const SignUpText = styled.p`
  opacity: 0.8;
  font-size: var(--font-size-8);
  font-weight: var(--font-weight-semibold);
`;
