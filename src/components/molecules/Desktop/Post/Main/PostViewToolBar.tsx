import { FC } from "react";
import PostListView from "../List/PostListView";
import styled from "styled-components";
import EyeIcon from "@/components/atoms/icons/EyeIcon";
import { customView } from "@/utils/func/common";

interface Props {
  views: number;
}

const PostViewToolBar: FC<Props> = ({ views }) => {
  return (
    <MainContainer>
      <EyeIcon width={15} height={15} visible={true} />
      {customView(views)}
    </MainContainer>
  );
};

export default PostViewToolBar;

const MainContainer = styled.div`
  display: flex;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  align-items: center;
  gap: 5px;
  user-select: none;
  padding-left: 20px;
`;
