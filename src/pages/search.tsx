import { FC } from "react";

import Title from "@/components/atoms/Title";
import SearchTab from "@/components/organisms/Common/Tab/SearchTab";

const search: FC = () => {
  return (
    <>
      <Title title={"검색 - 약정"} content={"검색결과: 약을 찾아주는 요정"} />
      <SearchTab />
    </>
  );
};

export default search;
