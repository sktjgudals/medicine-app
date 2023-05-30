import EyeIcon from "@/components/atoms/icons/EyeIcon";
import { FC } from "react";
import styled from "styled-components";

const PostListView: FC<{ views: number }> = ({ views }) => {
  return (
    <MainContainer>
      <EyeIcon width={15} height={15} visible={true} />
      {views}
    </MainContainer>
  );
};

export default PostListView;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  user-select: none;
`;
