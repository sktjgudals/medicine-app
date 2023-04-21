import { FC } from "react";

import Logo from "@/components/atoms/Logo";
import styled from "styled-components";

interface Props {
  width: number;
  height: number;
  text: string;
}

const ModalLogo: FC<Props> = ({ width, height, text }) => {
  return (
    <div>
      <LogoMainContainer>
        <LogoSubContainer>
          <Logo width={width} height={height} />
          <TextContainer>
            <Text>{text}</Text>
          </TextContainer>
        </LogoSubContainer>
      </LogoMainContainer>
    </div>
  );
};

export default ModalLogo;

const LogoMainContainer = styled.div`
  display: flex !important;
  flex-direction: column !important;
`;

const LogoSubContainer = styled.div`
  display: inline-flex !important;
  -webkit-box-align: center !important;
  align-items: center !important;
  -webkit-box-pack: center !important;
  justify-content: center !important;
`;

const TextContainer = styled.div`
  text-align: center !important;
`;

const Text = styled.h4`
  color: var(--color-text-base);
  font-family: var(--font-display);
  line-height: var(--line-height-heading) !important;
  font-size: var(--font-size-3) !important;
  font-weight: var(--font-weight-semibold) !important;
`;
