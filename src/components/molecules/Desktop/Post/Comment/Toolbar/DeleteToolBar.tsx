import React, { FC } from "react";
import styled from "styled-components";

import { useMutation } from "@apollo/client";
import { CommentDelMutation } from "apollo/querys/comment";
import {
  ToolBarButtonContainer,
  ToolBarContainer,
} from "@/components/atoms/ToolBar";
import TrashCanIcon from "@/components/atoms/icons/TrashCanIcon";
import Loading from "@/components/atoms/Loading";

interface Props {
  userId: string;
  commentId: string;
}

const DeleteToolBar: FC<Props> = ({ userId, commentId }) => {
  const [mutateFunc, { loading, error }] = useMutation(CommentDelMutation);
  const deleteHandler = () => {
    mutateFunc({
      variables: { commentId, userId },
      update: (cache, { data }) => {
        const cacheId = cache.identify(data.commentDelete);
        cache.evict({ id: cacheId });
      },
    });
  };
  return (
    <ToolBarContainer>
      <ToolBarButtonContainer onClick={deleteHandler}>
        <IconContainer>
          <TrashCanIcon />
        </IconContainer>
        {loading ? (
          <Loading
            width={20}
            height={20}
            strokeWidth={10}
            top={0}
            bottom={0}
            right={0}
            left={0}
          />
        ) : (
          "삭제"
        )}
      </ToolBarButtonContainer>
    </ToolBarContainer>
  );
};

export default DeleteToolBar;

const IconContainer = styled.div`
  width: 20px;
  height: 20px;
`;
