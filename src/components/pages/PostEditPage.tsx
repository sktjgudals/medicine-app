import { Dispatch, FC, SetStateAction, lazy, memo, useEffect } from "react";
import styled from "styled-components";
import { editorThumbnail, editorTitleState, imageState } from "apollo/cache";

import Title from "../molecules/Desktop/Editor/Title";
import Tag from "../molecules/Desktop/Editor/Tag";
import ImageEditor from "../molecules/Desktop/Editor/ImageEditor";
import { useReactiveVar } from "@apollo/client";
import { imageUploadFetch } from "@/utils/api/image";
import { tokenCall } from "@/utils/varible";
import { POST_TYPE } from "@/types/post";

const LazyEditor = lazy(
  () => import("../molecules/Desktop/Editor/PostReEditor")
);

const PostEditPage: FC<POST_TYPE> = ({ id, body, title, tag, thumbnail }) => {
  const image = useReactiveVar(editorThumbnail);
  useEffect(() => {
    editorThumbnail(thumbnail);
    editorTitleState(title);
  }, []);

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
  let tagArr = tag;
  return (
    <HeightContainer>
      <MainContainer>
        <Title edit={true} postTitle={title} />
        <Tag edit={true} tagArr={tagArr} />
        <ImageEditor
          text={"썸네일 업로드"}
          cb={imageSubmitHandler}
          image={image}
          reactiveVar={editorThumbnail}
        />
        <LazyEditor body={body} postId={id} tagArr={tagArr} />
      </MainContainer>
    </HeightContainer>
  );
};

export default PostEditPage;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
`;

const HeightContainer = styled.div`
  padding-top: 52px;
`;
