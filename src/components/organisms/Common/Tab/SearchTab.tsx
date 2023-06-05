import { FC, memo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled from "styled-components";

import Tabs from "./Tabs";
import { QueryProps } from "@/types/apollo/search";
import { useSession } from "@/hooks/useSession";

const MemorizationTab = memo(Tabs);
const Section = dynamic(() => import("./Section"), { ssr: false });

interface Props {
  query: QueryProps;
}

const SearchTab: FC<Props> = ({ query }) => {
  const { loading, session } = useSession();
  const router = useRouter();
  if (loading) return <></>;
  const {
    type = query["type"],
    keyword = query["keyword"],
    sort = query["sort"],
  } = router.query as any;
  return (
    <MainContainer>
      <ContentContainer>
        <TitleContainer>검색결과</TitleContainer>
        <MemorizationTab type={type} />
        <Section tabs={type} keyword={keyword} sort={sort} session={session} />
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
