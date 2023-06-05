import { POST_TAG_TYPE } from "@/types/post";
import { useRouter } from "next/router";
import { FC } from "react";
import styled from "styled-components";

interface Props {
  tag: [POST_TAG_TYPE];
}

const PostTagBar: FC<Props> = ({ tag }) => {
  const router = useRouter();
  const tagClickHandler = (name: string) => {
    router.push(`/search?keyword=${name}&sort=created_at&type=tag`);
  };
  return (
    <MainContainer>
      {tag.length > 0 &&
        tag.map((el) => (
          <TagButtonContainer key={el.id}>
            <TagButton onClick={() => tagClickHandler(el.name)}>
              {el.name}
            </TagButton>
          </TagButtonContainer>
        ))}
    </MainContainer>
  );
};

export default PostTagBar;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  flex-wrap: wrap;
`;

const TagButtonContainer = styled.div`
  display: flex;
  height: 2rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--color-background-button);
  color: var(--color-green-9);
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--color-green-9);
  cursor: pointer;
`;

const TagButton = styled.button`
  font-size: 1rem;
  background-color: var(--color-background-button);
  border: none;
  cursor: pointer;
  color: var(--color-green-9);
`;
