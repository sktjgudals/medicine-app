import PenIcon from "@/components/atoms/icons/PenIcon";
import { FC } from "react";
import styled from "styled-components";

const ReEditToolBar: FC = () => {
  return (
    <MainContainer>
      <PenIcon />
    </MainContainer>
  );
};

export default ReEditToolBar;

const MainContainer = styled.div``;
