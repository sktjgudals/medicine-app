import SKProfilePost from "@/components/atoms/Skeleton/SKProfilePost";
import SKProfileUser from "@/components/atoms/Skeleton/SKProfileUser";
import { FC } from "react";
import styled from "styled-components";

const SKProfile: FC = () => {
  return (
    <MainContainer>
      <SKProfileUser />
      <SKProfilePost />
    </MainContainer>
  );
};

export default SKProfile;

const MainContainer = styled.main`
  padding: 56px 30px 40px 30px;
`;
