import EmailIcon from "@/components/atoms/icons/EmailIcon";
import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

interface Props {
  setLocalLogin: Dispatch<SetStateAction<"block" | "none">>;
}

const LocalSignUpModal: FC<Props> = ({ setLocalLogin }) => {
  return (
    <LocalSignUpContainer>
      <FlexContainer onClick={() => setLocalLogin("block")}>
        <IconContainer>
          <EmailIcon width={30} height={30} />
        </IconContainer>
        <TextContainer>이메일 회원가입</TextContainer>
      </FlexContainer>
    </LocalSignUpContainer>
  );
};

export default LocalSignUpModal;

const LocalSignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  height: 70px;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  @media screen and (max-width: 500px) {
    padding-right: 10px;
  }
`;

const FlexContainer = styled.button`
  margin-right: 15%;
  margin-left: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-modal-default-background);
  color: var(--color-modal-default-text);
  border: none;
  text-decoration: none;
  user-select: none;
  border-radius: var(--border-radius-medium);
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.99);
  }
`;

const TextContainer = styled.div`
  font-weight: var(--font-weight-semibold);
`;
