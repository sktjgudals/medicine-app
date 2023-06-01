import TrashCanIcon from "@/components/atoms/icons/TrashCanIcon";
import { FC } from "react";
import styled from "styled-components";

const DeleteToolBar: FC = () => {
  return (
    <MainContainer>
      <TrashCanIcon />
    </MainContainer>
  );
};

export default DeleteToolBar;

const MainContainer = styled.div``;
