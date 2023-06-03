import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import UserIcon from "./icons/UserIcon";

interface Props {
  image: string | null;
  width: number;
  height: number;
}

const CircleImage: FC<Props> = ({ image, width, height }) => {
  return (
    <ProfileImageLink>
      <ProfileImage width={width} height={height}>
        {image ? (
          <Image
            src={image}
            alt="post_profile_image"
            width={width}
            height={height}
          />
        ) : (
          <UserIcon width={"100%"} height={"100%"} color={"grey"} />
        )}
      </ProfileImage>
    </ProfileImageLink>
  );
};

export default CircleImage;

const ProfileImageLink = styled.div`
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
  border: 1px solid var(--color-opac-gl-1);
  background-color: var(--color-modal-default-background);
`;
