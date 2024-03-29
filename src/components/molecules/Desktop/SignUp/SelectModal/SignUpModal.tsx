import styled from "styled-components";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Modal } from "@/components/atoms/Modal";
import { useMutation, useReactiveVar } from "@apollo/client";
import { signUpModalState } from "apollo/cache";
import ModalCloseButton from "../../Modal/ModalCloseButton";
import ModalLogo from "../../Modal/ModalLogo";
import ModalOauth from "../../Modal/ModalOauth";
import LocalSignUpModal from "./LocalSignUpModal";
import SignUpInput from "../Modal/SignUpInput";
import ModalBackButton from "../../Modal/ModalBackButton";
import { OAUTH_TYPE } from "@/types/signup";
import { OAUTH_KAKAO_USER_LINK, OAUTH_NAVER_LINK } from "apollo/querys/oauth";

const SignUpModal: FC = () => {
  const router = useRouter();
  const [oauthKakaoFunc, kakao] = useMutation(OAUTH_KAKAO_USER_LINK);
  const [oauthNaverFunc, naver] = useMutation(OAUTH_NAVER_LINK);
  const [localLogin, setLocalLogin] = useState<"block" | "none">("none");
  const ref = useRef<HTMLDivElement>(null);
  let isOpenModal = useReactiveVar(signUpModalState);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  const handleOutsideClick = (e: Event) => {
    const current = ref.current;
    if (isOpenModal && current && !current.contains(e.target as Node)) {
      signUpModalState(false);
    }
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
          console.info("error");
        }
      }
    } else if (type === "naver") {
      const { data } = await oauthNaverFunc();
      if (data["oauthNaverLink"]) {
        const { url } = data["oauthNaverLink"];
        if (url) {
          window.location.href = url;
        } else {
          console.info("error");
        }
      }
    } else {
      console.info("error");
    }
  };

  const closeHandler = (e: any) => {
    if (router.asPath === "/signup") {
      router.back();
    } else {
      signUpModalState(false);
    }
  };

  return (
    <StyledModal width={500} ref={ref}>
      <ModalContainer>
        <ModalLogo width={50} height={50} text={"회원가입"} />
        <FirstStage display={localLogin}>
          <SignUpInput />
          <ModalBackButton cb={setLocalLogin} />
        </FirstStage>
        <SecondStage display={localLogin === "none" ? "block" : "none"}>
          <LocalSignUpModal setLocalLogin={setLocalLogin} />
          <ModalMiddle />
          <ModalOauth
            text={"회원가입"}
            cb={OauthClickHandler}
            kakaoLoading={kakao.loading}
            kakaoError={kakao.error}
            naverLoading={naver.loading}
            naverError={naver.error}
          />
          <ModalCloseButton cb={closeHandler} />
        </SecondStage>
      </ModalContainer>
    </StyledModal>
  );
};

export default SignUpModal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column !important;
`;

const StyledModal = styled(Modal)`
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

const ModalMiddle = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-modal-default-background) !important;
`;

interface StageProps {
  display: string;
}

const FirstStage = styled.div<StageProps>`
  display: ${(props) => props.display};
`;

const SecondStage = styled.div<StageProps>`
  display: ${(props) => props.display};
`;
