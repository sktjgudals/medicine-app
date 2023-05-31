import { POST_PAGE_INFO, POST_TYPE } from "./post";
import { User_TYPE } from "./user";

export interface PROFILE_DATA {
  user: User_TYPE;
  posts: [POST_TYPE];
  pageInfo: POST_PAGE_INFO;
}
