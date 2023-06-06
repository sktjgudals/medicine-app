import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

import { User_TYPE } from "@/types/user";
import CircleImage from "@/components/atoms/CircleImage";

interface Props {
  user: User_TYPE;
}

const UserContent: FC<Props> = ({ user }) => {
  return (
    <MainContainer>
      <Link href={`/profile/${user.nickname}`}>
        <ContentContainer>
          <FirstRowContainer>
            <CircleImage image={user.image} width={100} height={100} />
          </FirstRowContainer>
          <SecondRowContainer>{user.nickname}</SecondRowContainer>
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
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-bold);
  padding-left: 100px;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 180px;
  width: 100%;
`;
