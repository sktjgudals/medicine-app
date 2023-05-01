import { FC } from "react";
import styled from "styled-components";
import { useSession } from "@/hooks/useSession";
import Link from "next/link";

const Main: FC = () => {
  const { session, loading } = useSession();
  if (loading) return <></>;

  return (
    <div>
      <LoginContainer>
        <div>
          <Link href="/test">테스트로 이동하기</Link>
        </div>
        {session ? (
          <MainLogin>
            <p>고유 아이디: {session.id} </p>
            <p>이메일: {session.email}</p>
            <p>닉네임: {session.nickname} </p>
          </MainLogin>
        ) : (
          <div></div>
        )}
      </LoginContainer>
    </div>
  );
};

export default Main;
const MainLogin = styled.div`
  font-size: var(--font-size-8);
  font-weight: var(--font-weight-semibold);
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
