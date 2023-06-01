import CircleImage from "@/components/atoms/CircleImage";
import { FC } from "react";
import styled from "styled-components";
interface Props {
  image: string;
}

const ProfileUserImage: FC<Props> = ({ image }) => {
  return (
    <MainContainer>
      <CircleImage image={image} width={100} height={100} />
    </MainContainer>
  );
};

export default ProfileUserImage;

const MainContainer = styled.div`
  display: flex;
`;
