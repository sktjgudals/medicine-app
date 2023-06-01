import React, { FC } from "react";
import styled from "styled-components";

const SKProfileUser: FC = () => {
  return (
    <MainContainer>
      <MainContents />
    </MainContainer>
  );
};

export default SKProfileUser;
const MainContents = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  padding: 70px;
  margin: 8px;
  background: var(--color-modal-default-background);
  border-radius: 20px;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
  margin-bottom: 50px;
`;
