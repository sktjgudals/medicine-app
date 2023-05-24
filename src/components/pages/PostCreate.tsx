import { Dispatch, FC, SetStateAction, lazy, memo } from "react";
import styled from "styled-components";
import { editorThumbnail, imageState } from "apollo/cache";

import Title from "../molecules/Desktop/Editor/Title";
import Tag from "../molecules/Desktop/Editor/Tag";
import ImageEditor from "../molecules/Desktop/Editor/ImageEditor";
import { useReactiveVar } from "@apollo/client";
import { imageUploadFetch } from "@/utils/api/image";
const LazyEditor = memo(
  lazy(() => import("../molecules/Desktop/Editor/MainEditor"))
);

const Post: FC = () => {
  const image = useReactiveVar(editorThumbnail);

  const imageSubmitHandler = async (
    base64: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setLoading(true);
      const res = await imageUploadFetch(base64, token);
      if (res["url"]) {
        setLoading(false);
        imageState(false);
        editorThumbnail(res["url"]);
      } else {
        setLoading(false);
      }
    }
  };
  return (
    <HeightContainer>
      <MainContainer>
        <Title />
        <Tag />
        <ImageEditor
          text={"썸네일 업로드"}
          cb={imageSubmitHandler}
          image={image}
          reactiveVar={editorThumbnail}
        />
        <LazyEditor />
      </MainContainer>
    </HeightContainer>
  );
};

export default Post;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
`;

const HeightContainer = styled.div`
  padding-top: 52px;
`;
