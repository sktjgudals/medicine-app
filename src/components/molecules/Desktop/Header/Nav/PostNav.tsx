import { FC } from "react";
import useModal from "@/hooks/useModal";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";

const PostNav: FC = () => {
  const { clickModal, isOpenModal } = useModal();
  const handleClick = async () => {
    clickModal();
  };
  return (
    <NavContainer>
      <NavButton onClick={handleClick}>
        <NavText>작성하기</NavText>
      </NavButton>
    </NavContainer>
  );
};

export default PostNav;
