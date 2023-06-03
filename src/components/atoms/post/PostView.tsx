import { FC } from "react";
import styled from "styled-components";
import EyeIcon from "../icons/EyeIcon";
import { customView } from "@/utils/func/common";

interface Props {
  views: number;
}

const PostView: FC<Props> = ({ views }) => {
  return (
    <MainContainer>
      <EyeIcon width={20} height={20} visible={true} />
      {customView(views)}
    </MainContainer>
  );
};

export default PostView;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;
