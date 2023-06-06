import { FC } from "react";
import styled from "styled-components";

const SKPostList: FC = () => {
  return (
    <MainContainer>
      <PostCotainer>
        <MainContent />
        <MainContent />
        <MainContent />
        <MainContent />
        <MainContent />
      </PostCotainer>
    </MainContainer>
  );
};

export default SKPostList;

const MainContent = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 220px;
  padding: 30px;
  background: var(--color-modal-default-background);
  margin-top: 10px;
  border-radius: 20px;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  padding: 10px;
`;

const PostCotainer = styled.div`
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  height: 100%;
  max-width: 1000px;
`;
