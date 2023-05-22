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
  console.info("hi");
  return (
    <ProfileImageLink>
      <ProfileImage width={width} height={height}>
        {image ? (
          <Image src={image} alt="post_profile_image" />
        ) : (
          <UserIcon width={"100%"} height={"100%"} color={"grey"} />
        )}
      </ProfileImage>
    </ProfileImageLink>
  );
};

export default CircleImage;

const ProfileImageLink = styled.a`
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
