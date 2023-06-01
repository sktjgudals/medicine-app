import EyeIcon from "@/components/atoms/icons/EyeIcon";
import { customView } from "@/utils/func/common";
import { FC } from "react";
import styled from "styled-components";

const PostListView: FC<{ views: number }> = ({ views }) => {
  return (
    <MainContainer>
      <EyeIcon width={15} height={15} visible={true} />
      {customView(views)}
    </MainContainer>
  );
};

export default PostListView;

const MainContainer = styled.div`
  display: inline-flex;
  width: 130px;
  align-items: center;
  gap: 5px;
  user-select: none;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
