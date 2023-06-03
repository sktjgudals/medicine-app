import { FC } from "react";
import styled from "styled-components";
import {
  ToolBarButtonContainer,
  ToolBarContainer,
} from "@/components/atoms/ToolBar";
import TrashCanIcon from "@/components/atoms/icons/TrashCanIcon";
import { useMutation } from "@apollo/client";
import { PostDeleteMutation } from "apollo/querys/post";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Props {
  postUserId: string;
  userId: string;
  postId: string;
  thumbnail: string | null;
}

const DeleteToolBar: FC<Props> = ({
  postId,
  userId,
  postUserId,
  thumbnail,
}) => {
  const router = useRouter();
  const [mutateFunc, { loading, error }] = useMutation(PostDeleteMutation);
  const deleteHandler = () => {
    if (userId === postUserId) {
      mutateFunc({
        variables: { postId, thumbnail },
        update: (cache, { data }) => {
          const cacheId = cache.identify(data.postDelete);
          cache.evict({ id: cacheId });
        },
      });
      toast.info("삭제에 성공하였습니다.");
      router.back();
    } else {
      toast.error("권한이 없습니다.");
    }
  };

  return (
    <ToolBarContainer>
      <ToolBarButtonContainer onClick={deleteHandler}>
        <IconContainer>
          <TrashCanIcon />
        </IconContainer>
        삭제
      </ToolBarButtonContainer>
    </ToolBarContainer>
  );
};

export default DeleteToolBar;

const IconContainer = styled.div`
  width: 20px;
  height: 20px;
`;
