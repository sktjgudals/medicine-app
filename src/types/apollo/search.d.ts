export interface SearchArgs {
  keyword: string;
  userId: string;
  cursor: string;
  limit: number;
  sort: string;
}

export type Tabs_TYPE = "body" | "tag" | "user";

export interface QueryProps {
  keyword: string;
  sort: string;
  type: string;
}

export interface SearchTabProps {
  keyword: string;
  sort: string;
}
