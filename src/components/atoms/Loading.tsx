import { FC } from "react";

import styled, { keyframes } from "styled-components";

interface Loading {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface MainProps extends Loading {
  strokeWidth: number;
}

const Loading: FC<MainProps> = ({
  width,
  height,
  strokeWidth,
  top,
  bottom,
  left,
  right,
}) => {
  return (
    <LoadingContainer
      width={width}
      height={height}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
    >
      <LoadingCircular viewBox="25 25 50 50">
        <LoadingCircle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#bcbcbc"
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
        />
      </LoadingCircular>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingDash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const LoadingRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div<Loading>`
  position: relative;
  top: ${(props) => props.top}%;
  bottom: ${(props) => props.bottom}%;
  right: ${(props) => props.right}%;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const LoadingCircular = styled.svg`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: ${LoadingRotate} 2s linear infinite;
  transform-origin: center;
`;

const LoadingCircle = styled.circle`
  animation: ${LoadingDash} 1.5s ease-in-out infinite;
  stroke-linecap: round;
`;
