import { FC } from "react";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";
import { useRouter } from "next/router";
import TermsIcon from "@/components/atoms/icons/TermsIcon";
import styled from "styled-components";

interface Props {
  toggleDropDown: () => void;
}

const Term: FC<Props> = ({ toggleDropDown }) => {
  const router = useRouter();
  const handler = () => {
    router.push(`/terms`).then(() => toggleDropDown());
  };
  return (
    <Wrapper>
      <NavContainer>
        <NavButton onClick={() => handler()}>
          <IconContainer>
            <TermsIcon width={20} height={20} />
          </IconContainer>
          <NavText>이용약관</NavText>
        </NavButton>
      </NavContainer>
    </Wrapper>
  );
};

export default Term;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 5px;
  gap: 10px;
`;

const IconContainer = styled.div`
  margin-left: -2px;
`;
