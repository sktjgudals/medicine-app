import Title from "@/components/atoms/Title";
import TermsPage from "@/components/pages/Terms";
import { FC } from "react";

const terms: FC = () => {
  return (
    <>
      <Title title={"이용약관 - 약정"} content={"약을 찾아주는 요정"} />
      <TermsPage />
    </>
  );
};

export default terms;
