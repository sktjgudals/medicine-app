import { FC } from "react";
import styled from "styled-components";

const SettingDeleteUser: FC = () => {
  return (
    <MainContainer>
      <TextContainer htmlFor="introduction">
        <TextContent>회원 탈퇴</TextContent>
        <SubTextContent>
          계정을 삭제하면 사용자 정보가 삭제됩니다.
        </SubTextContent>
      </TextContainer>
    </MainContainer>
  );
};

export default SettingDeleteUser;

const MainContainer = styled.div`
  display: flex;
  padding-top: 30px;
  flex-direction: column;
`;

const TextContainer = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 2px;
  height: 70px;
`;

const TextContent = styled.p`
  font-size: var(--font-size-7);
  font-weight: var(--font-weight-bold);
  user-select: none;
`;

const SubTextContent = styled.p`
  font-size: var(--font-size-9);
  font-weight: var(--font-weight-semibold);
  padding: 10px 20px 0px 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  max-width: 415px;
  width: 100%;
  padding-top: 10px;
`;
