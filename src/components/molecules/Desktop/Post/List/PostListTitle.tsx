import { FC } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  height: number;
  fontSize: number;
  paddingTop: number;
  lineClamp: number;
}

const PostListTitle: FC<Props> = ({
  title,
  height,
  fontSize,
  paddingTop,
  lineClamp,
}) => {
  return (
    <MainContainer height={height} fontSize={fontSize} paddingTop={paddingTop}>
      <TitleContainer lineClamp={lineClamp}>{title}</TitleContainer>
    </MainContainer>
  );
};

export default PostListTitle;

interface ContainerProps {
  height: number;
  fontSize: number;
  paddingTop: number;
}

export interface TitleProps {
  lineClamp: number;
}

const MainContainer = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  height: ${(props) => props.height}px;
  padding-left: 10px;
  padding-top: ${(props) => props.paddingTop}px;
  font-size: var(--font-size-${(props) => props.fontSize});
  font-weight: var(--font-weight-bold);
`;

const TitleContainer = styled.p<TitleProps>`
  display: -webkit-box;
  word-break: break-all;
  -webkit-line-clamp: ${(props) => props.lineClamp};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;
