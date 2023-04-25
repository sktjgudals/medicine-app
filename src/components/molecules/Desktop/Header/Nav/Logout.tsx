import { FC } from "react";
import styled from "styled-components";

import LogoutIcon from "@/components/atoms/icons/LogoutIcon";
import { localTokenVerify } from "@/utils/token";
import { useRouter } from "next/router";

const Logout: FC = () => {
  const router = useRouter();
  const logoutHandler = () => {
    const refresh_token = localStorage.getItem("refresh_token") as string;
    const decode_token = localTokenVerify(refresh_token) as any;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    if (decode_token["type"] === "kakao") {
      localStorage.setItem("redirect_uri", router.asPath);
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_KAKAO_LOGOUT}`;
    } else if (decode_token["type"] === "naver") {
      localStorage.setItem("redirect_uri", router.asPath);
    } else {
    }
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
