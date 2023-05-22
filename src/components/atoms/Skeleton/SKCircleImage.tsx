import { FC } from "react";
import styled from "styled-components";

interface Props {
  width: number;
  height: number;
}

const SKCircleImage: FC<Props> = ({ width, height }) => {
  return (
    <ProfileImageLink>
      <ProfileImage width={width} height={height} />
    </ProfileImageLink>
  );
};

export default SKCircleImage;

const ProfileImageLink = styled.span`
  user-select: none;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

interface ImageProps {
  width: number;
  height: number;
}

const ProfileImage = styled.div<ImageProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-modal-default-background);
`;
