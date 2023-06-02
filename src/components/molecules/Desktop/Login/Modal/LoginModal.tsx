import { FC, MouseEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { modalState } from "apollo/cache";
import { useMutation, useReactiveVar } from "@apollo/client";

import { Modal } from "@/components/atoms/Modal";

import LoginInput from "./LoginInput";
import ModalCloseButton from "../../Modal/ModalCloseButton";
import ModalLogo from "../../Modal/ModalLogo";
import ModalOauth from "../../Modal/ModalOauth";

import { OAUTH_TYPE } from "@/types/signup";
import { OAUTH_KAKAO_USER_LINK, OAUTH_NAVER_LINK } from "apollo/querys/oauth";

import { toast } from "react-toastify";

const LoginModal: FC = () => {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const [oauthKakaoFunc, kakao] = useMutation(OAUTH_KAKAO_USER_LINK);
  const [oauthNaverFunc, naver] = useMutation(OAUTH_NAVER_LINK);

  let isOpenModal = useReactiveVar(modalState);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  const handleOutsideClick = (e: Event) => {
    const current = ref.current;
    if (isOpenModal && current && !current.contains(e.target as Node))
      modalState(false);
  };

  const OauthClickHandler = async (e: MouseEvent, type: OAUTH_TYPE) => {
    localStorage.setItem("redirect_uri", router.asPath);
    if (type === "kakao") {
      const { data } = await oauthKakaoFunc();
      if (data["oauthKakaoUserLink"]) {
        const { url } = data["oauthKakaoUserLink"];
        if (url) {
          window.location.href = url;
        } else {
          toast.error("카카오 로그인에 실패하였습니다.");
        }
      }
    } else if (type === "naver") {
      const { data } = await oauthNaverFunc();
      if (data["oauthNaverLink"]) {
        const { url } = data["oauthNaverLink"];
        if (url) {
          window.location.href = url;
        } else {
          toast.error("네이버 로그인에 실패하였습니다.");
        }
      } else {
        toast.error("네이버 로그인에 실패하였습니다.");
      }
    }
  };

  const closeHandler = (e: any) => {
    if (router.asPath === "/login") {
      router.back();
    } else {
      modalState(false);
    }
  };

  return (
    <StyledLoginModal width={500} ref={ref}>
      <ModalContainer>
        <ModalLogo width={50} height={50} text={"로그인"} />
        <LoginInput />
        <ModalCloseButton cb={closeHandler} />
        <ModalOauth
          text={"로그인"}
          cb={OauthClickHandler}
          kakaoLoading={kakao.loading}
          kakaoError={kakao.error}
          naverLoading={naver.loading}
          naverError={naver.error}
        />
      </ModalContainer>
    </StyledLoginModal>
  );
};

export default LoginModal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column !important;
`;

const StyledLoginModal = styled(Modal)`
  display: flex !important;
  position: relative !important;
  background-color: var(--color-background-base) !important;
  padding: 2.5rem !important;
  border-radius: 0.4rem !important;
  overflow: hidden !important;
  @media screen and (max-width: 500px) {
    max-width: 400px;
    min-width: 200px;
  }
`;
