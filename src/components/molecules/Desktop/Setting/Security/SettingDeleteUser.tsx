import { FC } from "react";
import styled from "styled-components";
import ModalSubmitButton from "../../Modal/ModalSubmitButton";
import { useMutation } from "@apollo/client";
import { DeleteUser } from "apollo/querys/setting";
import { toast } from "react-toastify";
import { tokenDelete } from "@/utils/varible";
import { useRouter } from "next/router";

interface Props {
  id: string;
}

const SettingDeleteUser: FC<Props> = ({ id }) => {
  const router = useRouter();
  const [mutateFunc, { loading }] = useMutation(DeleteUser);

  const submitHandler = async () => {
    const { data } = await mutateFunc({ variables: { userId: id } });
    if (data.deleteUser) {
      tokenDelete();
      router.push("/");
      router.reload();
      toast.success(data.deleteUser);
    } else {
      toast.error("회원 삭제에 실패했습니다.");
    }
  };

  return (
    <MainContainer>
      <TextContainer htmlFor="introduction">
        <TextContent>회원 탈퇴</TextContent>
        <SubTextContent>
          계정을 삭제하면 사용자 정보가 삭제됩니다.
        </SubTextContent>
        <ButtonContainer>
          <ModalSubmitButton
            cb={submitHandler}
            loading={loading}
            text={"삭제"}
            color="red"
            submitOk={true}
          />
        </ButtonContainer>
      </TextContainer>
    </MainContainer>
  );
};

export default SettingDeleteUser;

const MainContainer = styled.div`
  display: flex;
  padding-top: 30px;
  flex-direction: column;
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

const ButtonContainer = styled.div`
  display: flex;
  max-width: 415px;
  width: 100%;
  padding-top: 10px;
`;
