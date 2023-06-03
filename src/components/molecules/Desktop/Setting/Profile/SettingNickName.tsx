import { toast } from "react-toastify";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { Input } from "@/components/atoms/Input";
import useInput from "@/hooks/useInput";
import { debounceFunc } from "@/utils/func/common";
import { findUserNickname } from "apollo/querys/signup";
import { ChangeEvent, FC, useCallback, useState } from "react";
import DuplicatedValue from "../../Modal/DuplicatedValue";
import ModalSubmitButton from "../../Modal/ModalSubmitButton";
import { ChangeProfileNickname } from "apollo/querys/setting";
import { tokenSet } from "@/utils/varible";
import { useSession } from "@/hooks/useSession";
import { initializeApollo } from "apollo/client";

interface Props {
  userId: string;
  nickname: string;
}

const SettingNickName: FC<Props> = ({ userId, nickname }) => {
  const { setReset } = useSession();
  const [mutateFunc, { loading }] = useMutation(ChangeProfileNickname);
  const [value, onChangeValue] = useInput(nickname);
  const [error, setError] = useState("현재 닉네임입니다.");
  const [duplicateloading, setLoading] = useState<boolean>(false);
  const [submitCheck, setSubmitCheck] = useState<boolean>(false);

  const submitHandler = async () => {
    const { data } = await mutateFunc({
      variables: { userId, nickname: value },
    });
    if (data.changeProfileNickname) {
      const apolloClient = initializeApollo();
      apolloClient.cache.evict({ fieldName: "findUserNickname" });
      apolloClient.cache.evict({ fieldName: "getUserData" });
      tokenSet(
        data.changeProfileNickname["access_token"],
        data.changeProfileNickname["refresh_token"]
      );
      toast.success("닉네임이 변경되었습니다.");
      setSubmitCheck(false);
      setError("현재 사용중인 닉네임입니다.");
      setReset(true);
    } else {
      toast.error("닉네임을 바꾸는데 실패하였습니다.");
    }
  };

  const checkDuplicateValue = useCallback(
    debounceFunc((value: any) => apiCall(value), 300),
    []
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    onChangeValue(e);
    if (e.target.value.length === 0) {
      setLoading(false);
      setSubmitCheck(false);
      return setError("닉네임을 입력해주세요.");
    } else if (e.target.value.length > 2 && e.target.value.length < 10) {
      setError("");
      return checkDuplicateValue(e.target.value);
    } else {
      setLoading(false);
      setSubmitCheck(false);
      return setError("닉네임은 3글자 이상, 10글자 이하여야 합니다.");
    }
  };

  const apiCall = async (value: string) => {
    try {
      const { data } = await findUserNickname(value);
      if (!data.findUserNickname) {
        setLoading(false);
        setError("");
        setSubmitCheck(true);
      } else {
        setError("중복된 닉네임입니다.");
        setLoading(false);
        setSubmitCheck(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  let submitOk = submitCheck && value.length !== 0;
  return (
    <MainContainer>
      <TextContainer htmlFor="nickname">
        <TextContent>닉네임</TextContent>
        <SubTextContent>
          현재 사용 중인 닉네임을 확인해 주세요. 선택한 새로운 닉네임과 중복되지
          않는지 확인해야 합니다.
        </SubTextContent>
      </TextContainer>
      <InputContainer htmlFor="nickname">
        <LoadingContainer>
          {duplicateloading && <LoadingPadding />}
          <DuplicatedValue loading={duplicateloading} check={submitOk} />
        </LoadingContainer>
        <NickNameInput id="nickname" onChange={onChangeHandler} value={value} />
      </InputContainer>
      <ErrorContainer>{error}</ErrorContainer>
      <ButtonContainer>
        <ModalSubmitButton
          cb={submitHandler}
          loading={loading}
          text={"변경"}
          submitOk={submitOk}
        />
      </ButtonContainer>
    </MainContainer>
  );
};

export default SettingNickName;

const MainContainer = styled.div`
  display: flex;
  padding-top: 30px;
  flex-direction: column;
`;

const InputContainer = styled.label`
  padding-top: 10px;
  display: flex;
  gap: 20px;
  width: 100%;
  flex-direction: column;
  @media screen and (max-width: 620px) {
    padding-right: 15px;
  }
`;

const LoadingPadding = styled.div`
  padding-top: 10px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  left: 220px;
  @media screen and (max-width: 500px) {
    left: 150px;
  }
`;

const NickNameInput = styled(Input)`
  width: 100%;
  max-width: 400px;
  height: var(--input-size-small);
  font-size: var(--input-text-large);
  border-radius: 0.4rem !important;
  padding-left: 10px;
  font-family: inherit;
  border-style: solid;
  border-width: var(--border-width-input);
  border-color: var(--color-border-input);
  color: var(--color-text-input);
  background-color: var(--color-background-input);
  z-index: 1;
  &:hover {
    border-color: var(--color-border-input-focus);
  }
`;

const TextContainer = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 2px;
  height: 70px;
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
  padding-left: 10px;
  font-size: var(--font-size-9);
  color: var(--color-text-error);
`;

const ButtonContainer = styled.div`
  max-width: 415px;
  padding-top: 10px;
`;
