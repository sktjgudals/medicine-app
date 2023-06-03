import { User_TYPE } from "./user";

export interface Comment_Type {
  id: string;
  postId: string;
  user: User_TYPE;
  isLike: boolean;
  likeCount: number;
  body: string;
  length: number;
  like: [CommentLike_Type];
  createdAt: number;
}

export interface CommentLike_Type {
  id: string;
  user: User_TYPE;
  userId: string;
  comment: Comment_Type;
  commentId: string;
}
