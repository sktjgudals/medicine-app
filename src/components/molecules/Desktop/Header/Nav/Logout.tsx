import { FC } from "react";
import styled from "styled-components";

import LogoutIcon from "@/components/atoms/icons/LogoutIcon";
import { useRouter } from "next/router";

const Logout: FC = () => {
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    router.reload();
  };

  return (
    <LogoutContainer>
      <LogoutButton onClick={logoutHandler}>
        <LogoutIcon width={19} height={19} />
        <LogoutText>로그아웃</LogoutText>
      </LogoutButton>
    </LogoutContainer>
  );
};

export default Logout;

const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 5px 0px 5px 0px;
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-right: 25px;
  gap: 5px;
`;

const LogoutText = styled.p`
  font-size: var(--font-size-8);
  font-weight: var(--font-weight-semibold);
`;
