import CircleImage from "@/components/atoms/CircleImage";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";
import { SESSIONTYPE } from "@/types/session";
import { useRouter } from "next/router";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  session: SESSIONTYPE;
  toggleDropDown: () => void;
}

const Profile: FC<Props> = ({ session, toggleDropDown }) => {
  const router = useRouter();
  const handler = () => {
    router.push("/setting/profile").then(() => toggleDropDown());
  };
  return (
    <>
      <NavContainer>
        <NavButton onClick={handler}>
          <ProfileContainer>
            <CircleImage width={35} height={35} image={session.image} />
            <NavText>{session.nickname}</NavText>
          </ProfileContainer>
        </NavButton>
      </NavContainer>
      <LineContainer />
    </>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
  top: -6px;
`;

const LineContainer = styled.div`
  border-top: 2px solid var(--color-border-base);
`;
