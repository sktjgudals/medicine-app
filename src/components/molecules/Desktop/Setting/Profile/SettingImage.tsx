import { Dispatch, FC, SetStateAction } from "react";
import ImageEditor from "../../Editor/ImageEditor";
import { imageState, profileImageState } from "apollo/cache";
import { useMutation, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { imageUploadFetch } from "@/utils/api/image";
import { ChangeProfileImage } from "apollo/querys/setting";
import { useSession } from "@/hooks/useSession";
import { tokenCall, tokenSet } from "@/utils/varible";
import { toast } from "react-toastify";

interface Props {
  userId: string;
}

const SettingImage: FC<Props> = ({ userId }) => {
  const { setReset } = useSession();
  const [mutateFunc, { loading, error }] = useMutation(ChangeProfileImage);

  const image = useReactiveVar(profileImageState);

  const imageSubmitHandler = async (
    base64: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    const { access } = tokenCall();
    if (access) {
      setLoading(true);
      const res = await imageUploadFetch(base64, access);
      if (res["url"]) {
        const { data } = await mutateFunc({
          variables: { userId: userId, image: res["url"] },
        });
        if (data.changeProfileImage) {
          tokenSet(
            data.changeProfileImage["access_token"],
            data.changeProfileImage["refresh_token"]
          );
          profileImageState(res["url"]);
          setLoading(false);
          imageState(false);
          setReset(true);
          toast.success("프로필 이미지 변경을 완료하였습니다.");
        } else {
          toast.error("프로필 이미지 변경을 실패하였습니다.");
          setLoading(false);
        }
      } else {
        toast.error("로그인이 필요합니다.");
        setLoading(false);
      }
    }
  };

  return (
    <MainContainer>
      <TextContainer>
        <TextContent>프로필 이미지</TextContent>
      </TextContainer>
      <ImageEditor
        text={"이미지 업로드"}
        image={image}
        reactiveVar={profileImageState}
        cb={imageSubmitHandler}
      />
    </MainContainer>
  );
};

export default SettingImage;

const MainContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2px;
`;

const TextContent = styled.p`
  user-select: none;
  font-size: var(--font-size-7);
  font-weight: var(--font-weight-bold);
`;
