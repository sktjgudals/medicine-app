import { FC } from "react";
import styled from "styled-components";
import Loading from "@/components/atoms/Loading";
import SubmitCheck from "./SubmitCheck";

interface Props {
  loading: boolean;
  check: boolean;
}

const DuplicatedValue: FC<Props> = ({ loading, check }) => {
  return (
    <LoadingContainer>
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
    </LoadingContainer>
  );
};

export default DuplicatedValue;

const LoadingContainer = styled.div`
  position: absolute;
  right: 0;
  padding-right: 40px;
`;
