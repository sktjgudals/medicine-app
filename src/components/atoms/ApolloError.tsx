import { FC } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  body: string | null;
}

const ApolloError: FC<Props> = ({ title, body }) => {
  return (
    <MainContainer>
      <ErrorMessage>
        <ErrorTitle>{title}</ErrorTitle>
        {body ? <ErrorBody>{body}</ErrorBody> : null}
      </ErrorMessage>
    </MainContainer>
  );
};

export default ApolloError;

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 50px;
`;

const ErrorMessage = styled.div`
  cursor: pointer;
  max-width: 1000px;
  flex-direction: column;
  display: flex;
  background-color: var(--color-modal-default-background);
  justify-content: center;
  border-radius: 2rem;
  width: 100%;
  &:hover {
    background-color: var(--color-background-input-focus);
  }
`;

const ErrorTitle = styled.div`
  width: 100%;
  font-size: var(--font-size-5);
  padding: 50px 50px 0px 50px;
  height: 100%;
`;

const ErrorBody = styled.div`
  width: 100%;
  padding: 20px 50px 50px 50px;
  height: 100%;
`;
