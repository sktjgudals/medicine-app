import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { imageState, postThumbnail } from "apollo/cache";
import { useReactiveVar } from "@apollo/client";
import ImageUploading from "react-images-uploading";

import ModalCloseButton from "../Modal/ModalCloseButton";
import { Modal } from "@/components/atoms/Modal";
import { ColorButton } from "@/components/atoms/Button";
import UploadIcon from "@/components/atoms/icons/UploadIcon";
import Image from "next/image";
import Loading from "@/components/atoms/Loading";

const ImageUpload: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const maxNumber = 1;

  const ref = useRef<HTMLDivElement>(null);

  let isOpenModal = useReactiveVar(imageState);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  const handleOutsideClick = (e: Event) => {
    const current = ref.current;
    if (isOpenModal && current && !current.contains(e.target as Node)) {
      imageState(false);
    }
  };

  const onSubmit = async () => {
    if (images.length === 0) return;
    const token = localStorage.getItem("access_token");
    if (token) {
      if (images[0].data_url) {
        setLoading(true);
        const { url, error } = await fetch("/api/v1/image", {
          method: "POST",
          body: images[0].data_url,
          headers: {
            Authorization: token,
          },
        })
          .then((data) => {
            return data.json();
          })
          .catch((e) => {
            console.info(e);
          });
        if (url) {
          setLoading(false);
          imageState(false);
          postThumbnail(url);
        } else {
          setLoading(false);
          console.info(error);
        }
      } else {
        setLoading(false);
        console.info("이미지 등록");
      }
    } else {
      setLoading(false);
      console.info("로그인필요");
    }
  };

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };

  return (
    <StyledLoginModal ref={ref}>
      <MainContainer>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg", "jpeg", "svg", "png", "webp"]}
        >
          {({ imageList, onImageUpdate, dragProps, errors }) => (
            <UploadImageContainer>
              <DropzoneContainer>
                {imageList[0] ? (
                  <ImageDropzone
                    {...dragProps}
                    onClick={() => onImageUpdate(0)}
                  >
                    <Image
                      src={imageList[0].data_url}
                      alt="image"
                      width={200}
                      height={200}
                    />
                  </ImageDropzone>
                ) : (
                  <ImageDropzone
                    {...dragProps}
                    onClick={() => onImageUpdate(0)}
                  >
                    <IconContainer>
                      <UploadIcon width={100} height={100} />
                    </IconContainer>
                    <TextContainer>
                      <b>이미지 업로드 하기</b>
                    </TextContainer>
                  </ImageDropzone>
                )}
              </DropzoneContainer>
              {imageList[0] && (
                <NoticeContainer>
                  <ColorButton
                    backgroundColor="var(--color-green-10)"
                    color="var(--color-opac-w-15)"
                    onClick={() => {
                      onImageUpdate(0);
                    }}
                  >
                    이미지 바꾸기
                  </ColorButton>
                </NoticeContainer>
              )}
              {errors && (
                <NoticeContainer>
                  {errors.acceptType && (
                    <ErrorContent>타입이 올바르지 않습니다.</ErrorContent>
                  )}
                  {errors.maxFileSize && (
                    <ErrorContent>이미지 사이즈가 큽니다.</ErrorContent>
                  )}
                  {errors.resolution && (
                    <ErrorContent>
                      원하는 해상도와 일치하지 않습니다.
                    </ErrorContent>
                  )}
                </NoticeContainer>
              )}
            </UploadImageContainer>
          )}
        </ImageUploading>
        {images.length !== 0 && (
          <SubmitContainer>
            <ColorButton
              width={200}
              backgroundColor="rgb(29, 78, 216)"
              onClick={onSubmit}
              color="var(--color-opac-w-15)"
            >
              {loading ? (
                <Loading
                  width={25}
                  height={25}
                  strokeWidth={10}
                  top={0}
                  bottom={0}
                  right={0}
                  left={0}
                />
              ) : (
                "이미지 등록하기"
              )}
            </ColorButton>
          </SubmitContainer>
        )}
        <XButtonContainer>
          <ModalCloseButton cb={imageState} />
        </XButtonContainer>
      </MainContainer>
    </StyledLoginModal>
  );
};
export default ImageUpload;

const StyledLoginModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--color-background-base) !important;
  padding: 2.5rem;
  border-radius: 0.4rem;
  overflow: hidden;
  @media screen and (max-width: 500px) {
    max-width: 400px;
    min-width: 200px;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const NoticeContainer = styled.div`
  padding-top: 20px;
`;

const UploadImageContainer = styled.div`
  padding: 60px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropzoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-width: 200px;
  max-height: 250px;
`;

const ImageDropzone = styled.div`
  width: 100%;
  height: 100%;
  &:hover {
    opacity: 0.8;
    transition-duration: 0.4s;
  }
`;

const XButtonContainer = styled.div`
  &:hover {
    opacity: 0.8;
    transition-duration: 0.4s;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: -10px;
`;

const TextContainer = styled.div`
  padding-top: 10px;
  text-align: center;
  font-size: var(--font-size-7);
`;

const ErrorContent = styled.span`
  text-align: center;
  font-size: var(--font-size-8);
  height: 100%;
  color: red;
  overflow: hidden;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;
