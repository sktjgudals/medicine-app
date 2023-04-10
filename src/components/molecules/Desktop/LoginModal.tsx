import { Modal, ModalWrapper } from "@/components/atoms/Modal";
import { FC } from "react";
import styled from "styled-components";

const LoginModal: FC = () => {
  return <StyledLoginModal width={300} height={300} />;
};

export default LoginModal;

const StyledLoginModal = styled(Modal)`
  background-color: red;
`;
