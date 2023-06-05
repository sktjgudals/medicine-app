import { Dispatch, FC, SetStateAction, lazy, memo } from "react";
import { editorThumbnail, imageState } from "apollo/cache";

import Title from "../molecules/Desktop/Editor/Title";
import Tag from "../molecules/Desktop/Editor/Tag";
import ImageEditor from "../molecules/Desktop/Editor/ImageEditor";
import { useReactiveVar } from "@apollo/client";
import { imageUploadFetch } from "@/utils/api/image";
import { tokenCall } from "@/utils/varible";
import {
  DelButton,
  DelButtonContainer,
  MainContainer,
  ThumTitleContainer,
  ThumbnailContainer,
  ThumbnailContent,
} from "../atoms/post/Post";

const LazyEditor = memo(
  lazy(() => import("../molecules/Desktop/Editor/MainEditor"))
);

const Post: FC = () => {
  const image = useReactiveVar(editorThumbnail);

  const imageSubmitHandler = async (
    base64: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    const { access } = tokenCall();
    if (access) {
      setLoading(true);
      const res = await imageUploadFetch(base64, access);
      if (res["url"]) {
        setLoading(false);
        imageState(false);
        editorThumbnail(res["url"]);
      } else {
        setLoading(false);
      }
    }
  };

  const imageDeleteHandler = () => {
    editorThumbnail("");
  };

  return (
    <MainContainer>
      <Title edit={false} />
      <Tag edit={false} />
      <ThumbnailContainer>
        <ThumTitleContainer>썸네일</ThumTitleContainer>
        <ThumbnailContent>
          직접 이미지를 업로드하거나, 아래 본문에서 유튜브 링크를 입력하거나
          이미지를 업로드하시면 자동으로 썸네일로 등록됩니다.
        </ThumbnailContent>
        <ImageEditor
          text={"썸네일 업로드"}
          cb={imageSubmitHandler}
          image={image}
          reactiveVar={editorThumbnail}
        />
      </ThumbnailContainer>
      {image && (
        <DelButtonContainer>
          <DelButton onClick={imageDeleteHandler}>삭제</DelButton>
        </DelButtonContainer>
      )}
      <LazyEditor />
    </MainContainer>
  );
};

export default Post;
