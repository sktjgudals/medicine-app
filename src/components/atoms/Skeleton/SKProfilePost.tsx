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
  padding: 200px;
  width: 100%;
  height: 100%;
  max-width: 1000px;
`;
