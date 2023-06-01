import { FC, useCallback } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { PostLikeMutation } from "apollo/querys/post";

import EmptyHeartIcon from "@/components/atoms/icons/EmptyHeartIcon";
import HeartIcon from "@/components/atoms/icons/HeartIcon";
import {
  ToolBarButtonContainer,
  ToolBarContainer,
} from "@/components/atoms/ToolBar";
import { debounceFunc } from "@/utils/func/common";
import Loading from "@/components/atoms/Loading";

interface Props {
  isLike: boolean;
  likeCount: number;
  userId: string | null;
  postId: string;
}

const HeartToolBar: FC<Props> = ({ isLike, likeCount, userId, postId }) => {
  const [mutateFunc, { loading, error }] = useMutation(PostLikeMutation);

  const likeFunc = useCallback(
    debounceFunc(
      () => mutateFunc({ variables: { postId, userId, isLike, likeCount } }),
      200
    ),
    [isLike]
  );

  const buttonHandler = () => {
    if (userId) {
      likeFunc();
      if (error) {
        return toast.error("추천을 실패하였습니다.");
      }
    } else {
      toast.info("로그인이 필요한 서비스입니다.");
    }
  };

  return (
    <ToolBarContainer>
      <ToolBarButtonContainer onClick={buttonHandler}>
        <HeartToolBarContainer>
          {isLike ? <HeartIcon /> : <EmptyHeartIcon />}
        </HeartToolBarContainer>
        {!loading ? (
          likeCount
        ) : (
          <Loading
            width={10}
            height={10}
            strokeWidth={10}
            top={0}
            bottom={0}
            right={0}
            left={0}
          />
        )}
      </ToolBarButtonContainer>
    </ToolBarContainer>
  );
};

export default HeartToolBar;

const HeartToolBarContainer = styled.div`
  width: 30px;
  height: 30px;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
