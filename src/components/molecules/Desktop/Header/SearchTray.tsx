import { FC } from "react";
import styled from "styled-components";

const SearchTray: FC = () => {
  return (
    <MainContainer>
      <ContentContainer>
        <MainContent>
          검색은 원하는 제목 또는 내용을 검색창에 입력하시면 관련된 글을 찾아볼
          수 있습니다.
        </MainContent>
        <MainContent>
          유저 검색은 "@" 기호 뒤에 원하는 사용자명을 입력하시면 됩니다. 예를
          들어, @약정 과 같이 사용하실 수 있습니다.
        </MainContent>
        <MainContent>
          태그 검색은 "#" 기호 뒤에 원하는 검색어를 입력하시면 됩니다. 예를
          들어, #약의 복용법 과 같이 사용하실 수 있습니다.
        </MainContent>
      </ContentContainer>
    </MainContainer>
  );
};

export default SearchTray;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.p`
  padding: 10px;
  line-height: 20px;
  font-size: var(--font-size-8);
`;

const ContentContainer = styled.div`
  max-width: 400px;
  position: absolute;
  top: 52px;
  background-color: var(--color-background-base) !important;
  box-shadow: var(--shadow-elevation-2) !important;
  border-radius: 10px;
  @media screen and (max-width: 550px) {
    max-width: 220px;
  }
`;
