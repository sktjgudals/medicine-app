import { useRouter } from "next/router";
import { FC } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import {
  ToolBarButtonContainer,
  ToolBarContainer,
} from "@/components/atoms/ToolBar";
import ClipIcon from "@/components/atoms/icons/ClipIcon";

const LinkToolBar: FC = () => {
  const router = useRouter();
  const clipHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `약정 - ${router.asPath.split("/")[2]}번째 글`,
          url: "https://naver.com",
        })
        .then(() => toast.success("공유 성공"))
        .catch((error) => toast.error("공유 실패"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("링크를 복사하였습니다.");
    }
  };

  return (
    <ToolBarContainer>
      <ToolBarButtonContainer onClick={clipHandler}>
        <ClipIcon width={30} height={30} />
        <TextContainer>공유</TextContainer>
      </ToolBarButtonContainer>
    </ToolBarContainer>
  );
};

export default LinkToolBar;

const TextContainer = styled.p``;
