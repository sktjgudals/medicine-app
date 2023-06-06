import { FC } from "react";
import { SearchTabProps, Tabs_TYPE } from "@/types/apollo/search";
import dynamic from "next/dynamic";
import { SESSIONTYPE } from "@/types/session";

const SearchPost = dynamic(
  () => import("@/components/molecules/Desktop/Search/SearchPost")
);
const SearchTag = dynamic(
  () => import("@/components/molecules/Desktop/Search/SearchTag")
);
const SearchUser = dynamic(
  () => import("@/components/molecules/Desktop/Search/SearchUser")
);

interface Props extends SearchTabProps {
  tabs: Tabs_TYPE;
  session: SESSIONTYPE | null;
}

const Section: FC<Props> = ({ tabs, keyword, sort, session }) => {
  if (tabs === "body") {
    return <SearchPost keyword={keyword} sort={sort} session={session} />;
  } else if (tabs === "tag") {
    return <SearchTag keyword={keyword} sort={sort} session={session} />;
  } else {
    return <SearchUser keyword={keyword} sort={sort} />;
  }
};

export default Section;
