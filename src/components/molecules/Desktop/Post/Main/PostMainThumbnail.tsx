import { FC } from "react";
import styled from "styled-components";
import ImageIcon from "@/components/atoms/icons/imageIcon";
import Image from "next/image";
import { blurDataUrl } from "@/utils/varible";

interface Props {
  thumbnail: string;
  width: number;
  height: number;
  responsiveWidth: number;
  responsiveHeight: number;
}

const PostMainThumbnail: FC<Props> = ({
  thumbnail,
  width,
  height,
  responsiveWidth,
  responsiveHeight,
}) => {
  return (
    <MainContainer>
      {thumbnail.length === 0 ? (
        <IconContainer
          responsiveWidth={responsiveWidth}
          responsiveHeight={responsiveHeight}
        >
          <ImageIcon width={width} height={height} color="grey" />
        </IconContainer>
      ) : (
        <ImageContainer
          width={width}
          height={height}
          responsiveWidth={responsiveWidth}
          responsiveHeight={responsiveHeight}
        >
          <StyledImg
            src={thumbnail}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="thumbnail_image"
            placeholder="blur"
            blurDataURL={blurDataUrl}
            priority={true}
          />
        </ImageContainer>
      )}
    </MainContainer>
  );
};

export default PostMainThumbnail;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
`;

interface IconProps {
  responsiveWidth: number;
  responsiveHeight: number;
}

interface ImageProps extends IconProps {
  width: number;
  height: number;
}

const ImageContainer = styled.div<ImageProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  @media screen and (max-width: 650px) {
    width: ${(props) => props.responsiveWidth}px;
    height: ${(props) => props.responsiveHeight}px;
  }
`;

const StyledImg = styled(Image)`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const IconContainer = styled.div<IconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 650px) {
    width: ${(props) => props.responsiveWidth}px;
    height: ${(props) => props.responsiveHeight}px;
  }
`;
