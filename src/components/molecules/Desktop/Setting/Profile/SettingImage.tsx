import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { imageState, profileImageState } from "apollo/cache";
import { initializeApollo } from "apollo/client";
import { useMutation, useReactiveVar } from "@apollo/client";
import { ChangeProfileImage } from "apollo/querys/setting";

import ImageEditor from "../../Editor/ImageEditor";
import { imageUploadFetch } from "@/utils/api/image";
import { tokenCall, tokenSet } from "@/utils/varible";

import { useSession } from "@/hooks/useSession";

import { DelButton, DelButtonContainer } from "@/components/atoms/post/Post";

interface Props {
  userId: string;
}

const SettingImage: FC<Props> = ({ userId }) => {
  const { setReset } = useSession();
  const [mutateFunc, { loading, error }] = useMutation(ChangeProfileImage);

  const image = useReactiveVar(profileImageState);
  const apolloClient = initializeApollo();

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
          variables: { userId: userId, image: res["url"], type: "update" },
        });
        if (data.changeProfileImage) {
          tokenSet(
            data.changeProfileImage["access_token"],
            data.changeProfileImage["refresh_token"]
          );
          profileImageState(res["url"]);
          setLoading(false);
          imageState(false);
          apolloClient.cache.evict({ fieldName: "getUserData" });
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

  const imageDelete = async () => {
    const { data } = await mutateFunc({
      variables: { userId: userId, image: image, type: "del" },
    });
    if (data.changeProfileImage) {
      tokenSet(
        data.changeProfileImage["access_token"],
        data.changeProfileImage["refresh_token"]
      );
    }
    profileImageState("");
    setReset(true);
    apolloClient.cache.evict({ fieldName: "getUserData" });
    toast.success("프로필 이미지를 삭제했습니다.");
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
      {image.length > 0 && (
        <DelButtonContainer style={{ paddingTop: "5px" }}>
          <DelButton onClick={imageDelete}>삭제</DelButton>
        </DelButtonContainer>
      )}
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
