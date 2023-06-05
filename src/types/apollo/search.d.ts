export interface SearchArgs {
  keyword: string;
  userId: string;
  cursor: string;
  limit: number;
  sort: string;
}

export type Tabs_TYPE = "body" | "tag" | "user";
