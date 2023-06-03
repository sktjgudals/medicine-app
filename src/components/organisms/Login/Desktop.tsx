import { FC } from "react";
import styled from "styled-components";

import { ModalWrapper } from "../../atoms/Modal";
import LoginModal from "../../molecules/Desktop/Login/Modal/LoginModal";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/router";

const DesktopLogin: FC = () => {
  const router = useRouter();
  const { loading, session } = useSession();
  if (loading) return <></>;
  if (session) {
    router.back();
    return <></>;
  }
  return (
    <StyledLoginModalWrapper>
      <LoginModal />
    </StyledLoginModalWrapper>
  );
};

export default DesktopLogin;

const StyledLoginModalWrapper = styled(ModalWrapper)`
  display: flex;
  position: fixed;
  z-index: var(--z-index-modal);
  justify-content: center;
  align-items: center;
  overflow: auto;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
`;
