import { Button } from "@/components/atoms/Button";
import { Tabs_TYPE } from "@/types/apollo/search";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import styled from "styled-components";

interface Props {
  type: Tabs_TYPE;
}

const Tabs: FC<Props> = ({ type }) => {
  const router = useRouter();
  const [tabs, setTabs] = useState<Tabs_TYPE>(type);
  const { keyword, sort } = router.query;
  const TabClickHandler = (tabType: Tabs_TYPE) => {
    setTabs(tabType);
    router.push(
      {
        pathname: "/search",
        query: { keyword: keyword, sort: sort, type: tabType },
      },
      "",
      {
        shallow: true,
      }
    );
  };

  return (
    <MainContainer>
      <TabWrapper>
        <TabButton onClick={() => TabClickHandler("body")}>글</TabButton>
        <TabButton onClick={() => TabClickHandler("tag")}>태그</TabButton>
        <TabButton onClick={() => TabClickHandler("user")}>유저</TabButton>
      </TabWrapper>
    </MainContainer>
  );
};

export default Tabs;

const MainContainer = styled.div`
  width: 100%;
  height: 44px;
  background-color: var(--bg-white-c);
  display: flex;
  padding 0px 10px 0px 10px;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 2px;
`;

const TabButton = styled(Button)`
  width: 100%;
  display: flex;
  font-size: 14px;
  line-height: 1;
  align-items: center;
  padding: 0 15px;
  border-bottom: 2px solid var(--bg-white-c);
  &:active {
    color: #f7913b;
    border-bottom-color: #f7913b;
  }
`;
