import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled from "styled-components";
import Tabs from "./Tabs";
import { Tabs_TYPE } from "@/types/apollo/search";

const SearchTab: FC = () => {
  const router = useRouter();
  const { type = "body" } = router.query as any;
  const [tabs, setTabs] = useState<Tabs_TYPE>(type);
  return (
    <MainContainer>
      <ContentContainer>
        <TitleContainer>검색결과</TitleContainer>
        <Tabs setTabs={setTabs} tabs={tabs} />
      </ContentContainer>
    </MainContainer>
  );
};

export default SearchTab;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 56px 0px 0px 0px;
`;

const TitleContainer = styled.h2`
  padding: 20px;
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-semibold);
`;

const ContentContainer = styled.div`
  max-width: 1024px;
  width: 100%;
  height: 100%;
  // background: red;
`;

// import styles from "./styles/index.module.css";

// import { useState, useEffect } from "react";

// const Komyu = dynamic(() => import("./komyu"));
// const User = dynamic(() => import("./user"));
// const Post = dynamic(() => import("./post"));

// import { useSession } from "next-auth/react";

// const TABS = ["post", "komyu", "user"];

// export default function Index() {
//
//   useEffect(() => {
//     if (TABS.includes(tab as string)) {
//       setTabs(tab as "post" | "komyu" | "user");
//     } else {
//       setTabs("post");
//     }
//   }, [tab]);
//   const { data: session, status } = useSession();
//   if (status === "loading") return null;
//   return (
//     <div>
//       <div className={styles.title}>検索結果</div>
//       <Tabs
//         tabs={tabs}
//         setTabs={(value: "post" | "komyu" | "user") => setTabs(value)}
//       />
//       <Section tabs={tabs} userId={session?.user.id} />
//     </div>
//   );
// }

// function Section({
//   tabs,
//   userId,
// }: {
//   tabs: "post" | "komyu" | "user";
//   userId?: string;
// }) {
//   if (tabs === "post") {
//     return <Post userId={userId} />;
//   } else if (tabs === "komyu") {
//     return <Komyu />;
//   } else {
//     return <User />;
//   }
// }
