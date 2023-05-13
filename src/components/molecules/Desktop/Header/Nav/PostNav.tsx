import { FC } from "react";
import Link from "next/link";

import useModal from "@/hooks/useModal";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";
import PenIcon from "@/components/atoms/icons/PenIcon";

const PostNav: FC = () => {
  const { clickModal } = useModal();
  const handleClick = async () => {
    clickModal();
  };
  return (
    <Link href="/post" style={{ opacity: 0.8 }}>
      <NavContainer>
        <NavButton onClick={handleClick}>
          <PenIcon width={19} height={19} />
          <NavText>작성하기</NavText>
        </NavButton>
      </NavContainer>
    </Link>
  );
};

export default PostNav;
