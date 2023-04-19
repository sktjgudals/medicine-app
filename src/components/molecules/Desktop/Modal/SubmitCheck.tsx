import { FC } from "react";
import styled from "styled-components";

import CheckIcon from "@/components/atoms/icons/CheckIcon";
import ExclamationIcon from "@/components/atoms/icons/ExclamationIcon";
import { useReactiveVar } from "@apollo/client";
import { emailSubmitCheck } from "apollo/cache";

const SubmitCheck: FC = () => {
  const checkEmail = useReactiveVar(emailSubmitCheck);

  return (
    <SubmitContainer>
      {checkEmail ? (
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
