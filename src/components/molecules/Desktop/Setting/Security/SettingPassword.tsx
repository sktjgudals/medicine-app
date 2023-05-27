import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { ChangePassword } from "apollo/querys/setting";
import ModalPassword from "../../Modal/ModalPassword";
import useInput from "@/hooks/useInput";
import { passwordVerify } from "@/utils/refexp";
import ModalSubmitButton from "../../Modal/ModalSubmitButton";
import { toast } from "react-toastify";

interface Props {
  type: string;
  id: string;
}

const SettingPassword: FC<Props> = ({ id, type }) => {
  const [mutateFunc, { loading }] = useMutation(ChangePassword);

  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [value, onChangeValue] = useInput("");

  const pwdCheck = useCallback(async () => {
    if (value.length === 0) {
      return setCheck(false);
    }
    if (value.length > 0) {
      const passwordOk = await passwordVerify(value);
      if (passwordOk) {
        if (check === false) {
          setMessage("");
          return setCheck(true);
        }
      } else {
        setMessage("최소8자,최소 하나의 문자 및 하나의 숫자를 포함해주세요.");
        if (check) {
          return setCheck(false);
        }
      }
    }
  }, [value]);

  useEffect(() => {
    pwdCheck();
  }, [pwdCheck]);

  const submitHandler = async () => {
    const { data } = await mutateFunc({
      variables: { userId: id, password: value },
    });
    if (!data) {
      toast.error("비밀번호 변경에 실패하였습니다.");
    } else {
      toast.success("비밀번호 변경에 성공하였습니다.");
    }
  };

  return (
    <MainContainer>
      <TextContainer htmlFor="password">
        <TextContent>비밀번호 변경</TextContent>
        {type === "local" ? (
          <SubTextContent>변경하실 비밀번호를 입력하여주세요.</SubTextContent>
        ) : (
          <SubTextContent>
            소셜로그인으로 로그인한 유저는 비밀번호 변경이 불가합니다.
          </SubTextContent>
        )}
      </TextContainer>
      {type === "local" && (
        <PasswordContainer>
          <ModalPassword
            value={value}
            onChangeValue={onChangeValue}
            cb={() => {}}
            pwdCheck={check}
          />
        </PasswordContainer>
      )}
      <ErrorContainer>{message}</ErrorContainer>
      <ButtonContainer>
        <ModalSubmitButton
          cb={submitHandler}
          loading={loading}
          text={"변경"}
          submitOk={check}
        />
      </ButtonContainer>
    </MainContainer>
  );
};

export default SettingPassword;

const MainContainer = styled.div`
  display: flex;
  padding-top: 30px;
  flex-direction: column;
`;

const TextContainer = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 2px;
`;

const TextContent = styled.p`
  font-size: var(--font-size-7);
  font-weight: var(--font-weight-bold);
  user-select: none;
`;

const SubTextContent = styled.p`
  font-size: var(--font-size-9);
  font-weight: var(--font-weight-semibold);
  padding: 10px 20px 0px 0px;
`;

const ErrorContainer = styled.div`
  padding-top: 10px;
  padding-left: 5px;
  padding-bottom: 5px;
  font-size: var(--font-size-9);
  color: var(--color-text-error);
`;

const ButtonContainer = styled.div`
  display: flex;
  max-width: 415px;
  width: 100%;
  padding-top: 10px;
`;

const PasswordContainer = styled.div`
  max-width: 415px;
  width: 100%;
`;
