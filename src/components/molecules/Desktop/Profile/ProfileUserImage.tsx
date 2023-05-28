import UserIcon from "@/components/atoms/icons/UserIcon";
import Image from "next/image";
import { FC } from "react";
import styled from "styled-components";
interface Props {
  image: string;
}

const ProfileUserImage: FC<Props> = ({ image }) => {
  return (
    <MainContainer>
      <ImageContainer>
        {image ? (
          <Image src={image} alt="profileImage" width={"100"} height={"100"} />
        ) : (
          <>
            <UserIcon width={"100%"} height={"100%"} />
          </>
        )}
      </ImageContainer>
    </MainContainer>
  );
};

export default ProfileUserImage;

const MainContainer = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  //   width: 50px;
  //   height: 50px;
`;
