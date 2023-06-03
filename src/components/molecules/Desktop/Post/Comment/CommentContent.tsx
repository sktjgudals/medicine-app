import { Comment_Type } from "@/types/comment";
import { FC } from "react";
import styled from "styled-components";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CircleImage from "@/components/atoms/CircleImage";
import Link from "next/link";
import CommentToolBar from "./Toolbar/CommentToolBar";
import { useSession } from "@/hooks/useSession";
import { useReactiveVar } from "@apollo/client";
import { commentEditMode } from "apollo/cache";
import CommentReEditor from "../../Editor/CommentReEditor";

const CommentContent: FC<Comment_Type> = ({
  id,
  body,
  user,
  createdAt,
  length,
}) => {
  const { loading, session } = useSession();
  const editModeId = useReactiveVar(commentEditMode);

  return (
    <MainContainer>
      <ImageContainer>
        <Link href={`/profile/${user.nickname}`}>
          <CircleImage width={50} height={50} image={user.image} />
        </Link>
      </ImageContainer>
      <InfoContainer>
        <CommentHeader createdAt={createdAt} nickname={user.nickname} />
        {editModeId === id ? (
          <>
            {session && (
              <CommentReEditor
                commentId={id}
                session={session}
                body={body}
                length={length}
              />
            )}
          </>
        ) : (
          <>
            <CommentBody body={body} length={length} />
            <CommentToolBar
              commentId={id}
              commentUserId={user.id}
              userId={session ? session.id : null}
            />
          </>
        )}
      </InfoContainer>
    </MainContainer>
  );
};

export default CommentContent;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100px;
  margin: 10px auto;
  background: var(--color-background-radius-button);
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  float: left;
  margin: 0px 0px 0px 20px;
  border-radius: 300px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
