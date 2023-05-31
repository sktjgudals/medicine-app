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
  postTag: [POST_TAG_TYPE];
  updatedAt: Date | number;
  createdAt: number;
}

export interface POST_TAG_TYPE {
  id: string;
  name: string;
  postId: string[];
}

export type POST_PAGE_INFO = {
  pageInfo: {
    cursor: string;
    hasNextPage: boolean;
  };
};
