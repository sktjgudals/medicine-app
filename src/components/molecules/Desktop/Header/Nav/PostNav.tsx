import { FC } from "react";
import { useRouter } from "next/router";
import useModal from "@/hooks/useModal";
import { NavButton, NavContainer, NavText } from "@/components/atoms/Nav";
import PenIcon from "@/components/atoms/icons/PenIcon";
interface Props {
  toggleDropDown: () => void;
}

const PostNav: FC<Props> = ({ toggleDropDown }) => {
  const { clickModal } = useModal();
  const router = useRouter();
  const handleClick = async () => {
    router.push("/post");
    clickModal();
  };
  return (
    <NavContainer>
      <NavButton onClick={() => handleClick().then(toggleDropDown)}>
        <PenIcon width={19} height={19} />
        <NavText>작성하기</NavText>
      </NavButton>
    </NavContainer>
  );
};

export default PostNav;
