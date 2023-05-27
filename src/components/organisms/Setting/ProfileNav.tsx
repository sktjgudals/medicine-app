import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

const ProfileNav: FC = () => {
  return (
    <MainContainer>
      <LeftNavContainer>
        <NavContainer>
          <NavList>
            <NavContent fontSize={20}>설정</NavContent>
            <Line />
            <Link href="/setting/profile">
              <NavContent fontSize={13}>프로필</NavContent>
            </Link>
            <Link href="/setting/security">
              <NavContent fontSize={13}>보안</NavContent>
            </Link>
          </NavList>
        </NavContainer>
      </LeftNavContainer>
    </MainContainer>
  );
};

export default ProfileNav;

const MainContainer = styled.div`
  width: 164px;
  flex-shrink: 0;
  @media screen and (max-width: 500px) {
    width: 90px;
  }
`;

const LeftNavContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  max-height: 100vh;
  overflow-y: auto;
  top: 80px;
`;

const NavContainer = styled.nav``;

const NavList = styled.ol`
  list-style: none;
`;

interface StyledLiProps {
  fontSize: number;
}

const NavContent = styled.li<StyledLiProps>`
  padding: 4px;
  padding-left: 30px;
  line-height: 2;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  user-select: none;
  &:hover {
    color: var(--color-green-10);
  }
`;

const Line = styled.div`
  margin-bottom: 20px;
  margin-left: 20px;
  border-bottom: 2px solid var(--color-border-base);
  user-select: none;
`;
