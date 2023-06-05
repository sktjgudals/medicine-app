import styled from "styled-components";
import { Button } from "../Button";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 72px 20px 0px 20px;
`;

const DelButtonContainer = styled.div`
  display: flex;
`;

const DelButton = styled(Button)`
  width: 200px;
  height: 30px;
  background: var(--color-red-8);
  color: var(--color-white-1);
`;

const ThumbnailContainer = styled.div``;

const ThumTitleContainer = styled.h2`
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-bold);
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ThumbnailContent = styled.h4`
  font-size: var(--font-size-6);
  font-weight: var(--font-weight-bold);
  line-height: 30px;
`;

export {
  MainContainer,
  ThumbnailContainer,
  ThumTitleContainer,
  DelButton,
  DelButtonContainer,
  ThumbnailContent,
};
