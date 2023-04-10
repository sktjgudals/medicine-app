import { FC } from "react";
import styled from "styled-components";

import { ModalWrapper } from "../atoms/Modal";
import LoginModal from "../molecules/Desktop/LoginModal";

const Login: FC = () => {
  return (
    <StyledLoginModalWrapper>
      <LoginModal />
    </StyledLoginModalWrapper>
  );
};

export default Login;

const StyledLoginModalWrapper = styled(ModalWrapper)``;
