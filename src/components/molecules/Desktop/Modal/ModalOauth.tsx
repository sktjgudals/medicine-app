import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  text: string;
}

const ModalOauth: FC<Props> = ({ text }) => {
  return (
    <OauthContainer>
      <FlexContainer>
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
      </FlexContainer>
      <FlexContainer>
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
      </FlexContainer>
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

const FlexContainer = styled.button`
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
