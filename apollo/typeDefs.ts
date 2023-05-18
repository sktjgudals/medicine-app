import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const typeDefs = gql`
  scalar JSON
  scalar Date

  type User {
    id: String
    email: String
    nickname: String
    image: String
  }

  type UserResponse {
    id: String
    access_token: JSON
    refresh_token: JSON
    error: Boolean
    code: String
    url: String
  }

  type Post {
    _id: String
    id: String
    title: String
    number: Int
    views: Int
    netabare: Boolean
    notice: Boolean
    private: Boolean
    userId: String
    body: String
    update: Boolean
    category: String
    isLike: Boolean
    isSave: Boolean
    likeCount: Int
    like: [PostLike]
    user: User
    comments: [Comment]
    updatedAt: Date
    createdAt: Date
    deletedAt: Date
  }
  type PostLike {
    id: String
    user: User
    userId: String
    post: Post
    postId: String
  }

  type Comment {
    _id: String
    id: String
    post: Post
    postId: String
    user: User
    isLike: Boolean
    likeCount: Int
    isReply: Boolean
    update: Boolean
    replyCount: Int
    userId: String
    body: String
    length: Int
    like: [CommentLike]
    subComments: [SubComment]
    updatedAt: Date
    createdAt: Date
  }

  type CommentLike {
    _id: String
    id: String
    user: User
    userId: String
    comment: Comment
    commentId: String
  }

  type SubComment {
    _id: String
    id: String
    comment: Comment
    commentId: String
    user: User
    length: Int
    update: Boolean
    isLike: Boolean
    likeCount: Int
    userId: String
    body: String
    like: [SubCommentLike]
    updatedAt: Date
    createdAt: Date
  }

  type SubCommentLike {
    _id: String
    id: String
    user: User
    userId: String
    subComment: SubComment
    subCommentId: String
  }

  type PostCreateResoponse {
    post: Post
  }

  type Query {
    findUserEmail(email: String): User
    findUserNickname(nickname: String): User
  }

  type Mutation {
    createLocalUser(
      email: String!
      nickname: String!
      password: String!
    ): UserResponse
    signinLocalUser(email: String!, password: String!): UserResponse
    oauthKakaoUserLink: UserResponse
    oauthNaverLink: UserResponse
    postDataCreate(data: JSON!): PostCreateResoponse
  }
`;

export const schema = makeExecutableSchema({ typeDefs });
