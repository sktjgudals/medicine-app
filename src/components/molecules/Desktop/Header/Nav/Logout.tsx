import { FC } from "react";
import { useRouter } from "next/router";

import LogoutIcon from "@/components/atoms/icons/LogoutIcon";
import { localTokenVerify } from "@/utils/token";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";

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
      router.reload();
    } else {
      router.reload();
    }
  };

  return (
    <NavContainer>
      <NavButton onClick={logoutHandler}>
        <LogoutIcon width={19} height={19} />
        <NavText>로그아웃</NavText>
      </NavButton>
    </NavContainer>
  );
};

export default Logout;
