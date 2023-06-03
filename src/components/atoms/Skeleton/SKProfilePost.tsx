import { FC } from "react";
import styled from "styled-components";

const SKProfilePost: FC = () => {
  return (
    <MainContainer>
      <PostCotainer />
    </MainContainer>
  );
};

export default SKProfilePost;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
  margin-bottom: 50px;
`;

const PostCotainer = styled.div`
  border-radius: 10px;
  background: var(--color-modal-default-background);
  padding: 400px;
  width: 100%;
  height: 100%;
  max-width: 1000px;
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
