import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { User_TYPE } from "@/types/user";
import CircleImage from "@/components/atoms/CircleImage";

const UserContent: FC<User_TYPE> = ({ nickname, image }) => {
  return (
    <MainContainer>
      <Link href={`/profile/${nickname}`}>
        <ContentContainer>
          <FirstRowContainer>
            <CircleImage image={image} width={100} height={100} />
          </FirstRowContainer>
          <SecondRowContainer>{nickname}</SecondRowContainer>
        </ContentContainer>
      </Link>
    </MainContainer>
  );
};

export default UserContent;

const MainContainer = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--color-modal-default-background);
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 5px;
`;

const FirstRowContainer = styled.div`
  display: flex;
  padding: 10px;
  padding-left: 40px;
`;

const SecondRowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-bold);
`;

const ContentContainer = styled.div`
  display: flex;
  height: 180px;
  width: 100%;
`;
