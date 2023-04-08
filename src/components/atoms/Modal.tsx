import styled from "styled-components";

interface StyledModalProps {
  width: number;
  height: number;
}

const Modal = styled.div<StyledModalProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  pointer-events: auto;
`;

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  width: 100%;
  height: 100%;
`;

export { Modal, ModalWrapper };
