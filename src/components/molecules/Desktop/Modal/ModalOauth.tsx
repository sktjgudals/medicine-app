import styled from "styled-components";
import { OAUTH_TYPE } from "@/types/signup";
import Image from "next/image";
import { FC, MouseEvent } from "react";

interface Props {
  text: string;
  cb: (e: MouseEvent, type: OAUTH_TYPE) => void;
}

const ModalOauth: FC<Props> = ({ text, cb }) => {
  return (
    <OauthContainer>
      <ButtonContainer onClick={(e: MouseEvent) => cb(e, "kakao")}>
        <ImageContainer>
          <Image
            src="/kakao.png"
            alt="kakao"
            width={40}
            height={40}
            priority={true}
          />
        </ImageContainer>
        <TextContainer>카카오 {text}</TextContainer>
      </ButtonContainer>
      <ButtonContainer onClick={(e: MouseEvent) => cb(e, "naver")}>
        <ImageContainer>
          <Image
            src="/naver.png"
            alt="naver"
            width={40}
            height={40}
            priority={true}
          />
        </ImageContainer>
        <TextContainer>네이버 {text}</TextContainer>
      </ButtonContainer>
    </OauthContainer>
  );
};

export default ModalOauth;

const OauthContainer = styled.div`
  display: flex;
  padding-top: 20px;
  gap: 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
  @media screen and (max-width: 500px) {
    padding-right: 10px;
  }
`;

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--color-modal-default-background);
  color: var(--color-modal-default-text);
  border: none;
  text-decoration: none;
  user-select: none;
  border-radius: var(--border-radius-medium);
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.99);
  }
`;

const TextContainer = styled.div`
  font-weight: var(--font-weight-semibold);
`;
