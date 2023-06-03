import { User_TYPE } from "./user";

export interface POST_TYPE {
  id: string;
  num: number;
  title: string;
  body: string;
  views: number;
  likeCount: number;
  user: User_TYPE;
  isLike: boolean;
  thumbnail: string;
  tag: [POST_TAG_TYPE];
  createdAt: number;
}

export interface POST_TAG_TYPE {
  id: string;
  name: string;
  postId: string[];
}

export type POST_PAGE_INFO = {
  cursor: string;
  hasNextPage: boolean;
};
