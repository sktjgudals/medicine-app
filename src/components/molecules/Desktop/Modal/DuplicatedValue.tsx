import { FC } from "react";
import Loading from "@/components/atoms/Loading";
import SubmitCheck from "./SubmitCheck";
import { useReactiveVar } from "@apollo/client";
import { emailLoadingCheck, emailSubmitCheck } from "apollo/cache";
import styled from "styled-components";

interface Props {
  loading: boolean;
  check: boolean;
}

const DuplicatedValue: FC<Props> = ({ loading, check }) => {
  return (
    <EmailLoadingContainer>
      {loading ? (
        <Loading
          width={20}
          height={20}
          strokeWidth={10}
          top={0}
          bottom={0}
          right={0}
          left={0}
        />
      ) : (
        <SubmitCheck check={check} />
      )}
    </EmailLoadingContainer>
  );
};

export default DuplicatedValue;

const EmailLoadingContainer = styled.div`
  position: absolute;
  right: 0;
  padding-right: 40px;
`;
