import { FC } from "react";
import styled from "styled-components";

import CheckIcon from "@/components/atoms/icons/CheckIcon";
import ExclamationIcon from "@/components/atoms/icons/ExclamationIcon";

interface Props {
  check: boolean;
}

const SubmitCheck: FC<Props> = ({ check }) => {
  return (
    <SubmitContainer>
      {check ? (
        <CheckIcon color="green" width={20} height={20} />
      ) : (
        <ExclamationIcon width={20} height={20} color="red" />
      )}
    </SubmitContainer>
  );
};

export default SubmitCheck;

const SubmitContainer = styled.div`
  padding-top: 10px;
`;
