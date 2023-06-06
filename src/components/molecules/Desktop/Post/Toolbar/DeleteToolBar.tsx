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
import Loading from "@/components/atoms/Loading";

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
      toast.info("게시글을 삭제하였습니다.");
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
