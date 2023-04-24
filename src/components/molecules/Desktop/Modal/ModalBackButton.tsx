import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "@/components/atoms/Button";
import BackIcon from "@/components/atoms/icons/BackIcon";
import styled from "styled-components";

interface Props {
  cb: Dispatch<SetStateAction<boolean>>;
}

const ModalBackButton: FC<Props> = ({ cb }) => {
  return (
    <Container>
      <StyledButton
        width={30}
        height={30}
        aria-label="뒤로 가기"
        onClick={() => cb(false)}
      >
        <BackIcon width={20} height={20} />
      </StyledButton>
    </Container>
  );
};

export default ModalBackButton;

const Container = styled.div`
  position: absolute;
  left: auto;
  right: 1rem;
  top: 1rem;
  margin-left: 0.5rem;
`;

const StyledButton = styled(Button)`
  position: relative;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  border-radius: var(--border-radius-medium);
  width: 2rem;
  height: 2rem;
  background-color: var(--color-background-button-text-default);
  color: var(--color-fill-button-icon);
`;
