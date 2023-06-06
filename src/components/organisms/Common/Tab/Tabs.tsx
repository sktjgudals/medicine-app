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
        <TabButton
          active={tabs === "body"}
          onClick={() => TabClickHandler("body")}
        >
          글
        </TabButton>
        <TabButton
          active={tabs === "tag"}
          onClick={() => TabClickHandler("tag")}
        >
          태그
        </TabButton>
        <TabButton
          active={tabs === "user"}
          onClick={() => TabClickHandler("user")}
        >
          유저
        </TabButton>
      </TabWrapper>
    </MainContainer>
  );
};

export default Tabs;

const MainContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  padding 0px 20px 0px 20px;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
`;

interface StyledProps {
  active: boolean;
}

const TabButton = styled(Button)<StyledProps>`
  width: 100%;
  display: flex;
  font-size: var(--font-size-9);
  line-height: 1;
  align-items: center;
  padding: 0 15px;
  background-color: var(--color-background-radius-button);
  ${(props) => (props.active ? "" : "")}
  border-bottom: 3px solid
    ${(props) =>
    props.active
      ? "var(--color-green-10)"
      : "var(--color-background-radius-button)"};
  transition: border-color 0.5s ease-in-out;
`;
