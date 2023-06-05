import { Tabs_TYPE } from "@/types/apollo/search";
import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  tabs: Tabs_TYPE;
  setTabs: (value: Tabs_TYPE) => void;
}

const Tabs: FC<Props> = ({ tabs, setTabs }) => {
  const router = useRouter();
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
`;

const TabWrapper = styled.div`
  flex: 1;
  display: flex;
`;

const TabButton = styled.button`
  display: flex;
  font-size: 14px;
  line-height: 1;
  align-items: center;
  padding: 0 15px;
  border-bottom: 2px solid var(--bg-white-c);
  //   color: var(--black-10);
  &:checked {
    color: #f7913b;
    border-bottom-color: #f7913b;
  }
`;
