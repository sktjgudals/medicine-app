import styled from "styled-components";
import { ChangeEvent, FC, useState } from "react";

import { Input } from "@/components/atoms/Input";
import ModalSubmitButton from "../../Modal/ModalSubmitButton";
interface Props {
  userId: string;
  introduction?: string | null;
}

const SettingIntroduction: FC<Props> = ({ introduction, userId }) => {
  const [value, onChangeValue] = useState(introduction ? introduction : "입력");
  const [loading, setLoading] = useState<boolean>(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value);
  };

  let submitOk = !loading;

  const submitHandler = () => {
    if (value.length === 0) {
    }
    console.info(value);
  };

  return (
    <MainContainer>
      <TextContainer htmlFor="introduction">
        <TextContent>소개</TextContent>
        <SubTextContent>간단한 소개를 적어주세요.</SubTextContent>
        <SmallText>
          소개글을 삭제하기 위해서는 글을 지우신후, 삭제 버튼을 클릭하시면
          됩니다.
        </SmallText>
      </TextContainer>
      <InputContainer>
        <IntroInput
          id="introduction"
          onChange={onChangeHandler}
          value={value}
        />
      </InputContainer>
      <ButtonContainer>
        {value.length === 0 ? (
          <ModalSubmitButton
            cb={submitHandler}
            loading={loading}
            text={"삭제"}
            submitOk={submitOk}
            color={"red"}
          />
        ) : (
          <ModalSubmitButton
            cb={submitHandler}
            loading={loading}
            text={"변경"}
            submitOk={submitOk}
          />
        )}
      </ButtonContainer>
    </MainContainer>
  );
};

export default SettingIntroduction;

const MainContainer = styled.div`
  display: flex;
  padding-top: 30px;
  flex-direction: column;
`;

const InputContainer = styled.div`
  padding-top: 10px;
  z-index: 1;
`;

const IntroInput = styled(Input)`
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
  &:hover {
    border-color: var(--color-border-input-focus);
    background-color: var(--color-background-input-focus);
  }
`;

const TextContainer = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 2px;
  height: 60px;
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
const SmallText = styled.p`
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-semibold);
  color: red;
  padding: 10px 20px 0px 0px;
`;

const ButtonContainer = styled.div`
  position: relative;
  max-width: 415px;
  top: -25px;
  height: 50px;
`;
