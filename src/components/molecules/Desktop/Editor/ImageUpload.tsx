import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { imageState } from "apollo/cache";
import { useReactiveVar } from "@apollo/client";
import ImageUploading from "react-images-uploading";

import ModalCloseButton from "../Modal/ModalCloseButton";
import { Modal } from "@/components/atoms/Modal";
import ImageIcon from "@/components/atoms/icons/imageIcon";
import { ColorButton } from "@/components/atoms/Button";

interface Props {
  image: any;
  setImage: Dispatch<SetStateAction<string>>;
}

const ImageUpload: FC<Props> = ({ image, setImage }) => {
  const [images, setImages] = useState([]);
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
    const host = "http://43.201.92.36";
    // if (images.length === 0) return;
    // const { data } = await axios
    //   .post(`${host}/api/v1/user/setting/profileimage`, {
    //     userId,
    //     image: images[0].data_url,
    //   })
    //   .catch((e) => {
    //     setImages([]);
    //   });
    // if (data) {
    //   setModalOpen(false);
    //   setImage(data.url);
    // } else {
    //   setImages([]);
    // }
  };

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };

  return (
    <StyledLoginModal ref={ref}>
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
                <ImageDropzone {...dragProps} onClick={() => onImageUpdate(0)}>
                  <img
                    src={imageList[0].data_url}
                    alt="image"
                    width="100%"
                    height="100%"
                  />
                </ImageDropzone>
              ) : (
                <ImageDropzone {...dragProps} onClick={() => onImageUpdate(0)}>
                  <ImageIcon color={"#cccccc"} />
                  <TextContainer>
                    <b>Drag and drop or click here</b>
                    <p>to upload your image (max 2mb)</p>
                  </TextContainer>
                </ImageDropzone>
              )}
            </DropzoneContainer>
            {imageList[0] && (
              <>
                <div className="Upload_Image_Remove_Container">
                  <button
                    onClick={() => {
                      onImageUpdate(0);
                    }}
                    className="Upload_Image_Remove_Button"
                  >
                    취소하고 다른 이미지 추가하기
                  </button>
                </div>
              </>
            )}
            {errors && (
              <div className="Upload_Image_Remove_Container">
                {errors.acceptType && (
                  <span className="Upload_Image_Error">
                    Your selected file type is not allow
                  </span>
                )}
                {errors.maxFileSize && (
                  <span className="Upload_Image_Error">
                    Selected file size exceed maxFileSize
                  </span>
                )}
                {errors.resolution && (
                  <span className="Upload_Image_Error">
                    Selected file is not match your desired resolution
                  </span>
                )}
              </div>
            )}
          </UploadImageContainer>
        )}
      </ImageUploading>
      <SubmitContainer>
        <ColorButton onClick={onSubmit}>이미지 등록하기</ColorButton>
      </SubmitContainer>
      <XButtonContainer>
        <ModalCloseButton cb={imageState} />
      </XButtonContainer>
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

const UploadImageContainer = styled.div`
  width: 100%;
  padding: 60px;
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
  width: 100%;
  justify-content: center;
`;

const TextContainer = styled.div`
  text-align: center;
  font-size: var(--font-size-7);
`;
